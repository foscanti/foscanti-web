# Deployment Runbook — S3 + CloudFront

This site is a **static export** (`next build` → `./out`) served from **S3**, with
**CloudFront** in front for HTTPS and CDN caching. Deploys are automated: every push
to `master` runs `.github/workflows/deploy.yml`, which builds, syncs to S3, and
invalidates the CloudFront cache.

You only do the AWS setup below **once**. After that, deploying = merging to `master`.

---

## Values you'll need

Gather these first; several steps reuse them.

| Placeholder | What it is | Where to find it |
| --- | --- | --- |
| `BUCKET_NAME` | Your S3 bucket name | S3 console |
| `AWS_REGION` | The bucket's region, e.g. `us-east-1` | S3 console → bucket → Properties |
| `ACCOUNT_ID` | Your 12-digit AWS account ID | Top-right of console → your name |
| `DISTRIBUTION_ID` | CloudFront distribution ID, e.g. `E1A2B3C4D5E6F7` | CloudFront console → Distributions |

---

## Phase 1 — S3 bucket (verify)

You already have this if you selected a bucket when creating the CloudFront
distribution. Keep **Block all public access = ON** — CloudFront reads it privately.

- [ ] Bucket exists and is **private** (Block all public access ON)

## Phase 2 — CloudFront distribution

- [ ] Distribution created with the bucket as origin, using **Origin Access Control (OAC)**
- [ ] **Viewer protocol policy** = Redirect HTTP to HTTPS
- [ ] **Default root object** = `index.html`
- [ ] **Bucket policy updated** — paste the policy from CloudFront's blue banner into
      S3 → bucket → Permissions → Bucket policy (this grants CloudFront read access)
- [ ] **CloudFront Function** `rewrite-index` published and associated (Viewer request,
      Default `*` behavior) so `/about/` resolves to `/about/index.html`:
      ```js
      function handler(event) {
          var request = event.request;
          var uri = request.uri;
          if (uri.endsWith('/')) {
              request.uri += 'index.html';
          } else if (!uri.includes('.')) {
              request.uri += '/index.html';
          }
          return request;
      }
      ```

## Phase 3 — IAM OIDC identity provider

Lets GitHub Actions authenticate to AWS without stored access keys.

- [ ] IAM console → **Identity providers** → **Add provider**
- [ ] Provider type **OpenID Connect**
- [ ] Provider URL: `https://token.actions.githubusercontent.com`
- [ ] Audience: `sts.amazonaws.com`
- [ ] **Add provider**

## Phase 4 — IAM permissions policy

- [ ] IAM → **Policies** → **Create policy** → **JSON** tab → paste (fill placeholders):
      ```json
      {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Sid": "ListBucket",
            "Effect": "Allow",
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::BUCKET_NAME"
          },
          {
            "Sid": "WriteObjects",
            "Effect": "Allow",
            "Action": ["s3:PutObject", "s3:DeleteObject"],
            "Resource": "arn:aws:s3:::BUCKET_NAME/*"
          },
          {
            "Sid": "InvalidateCloudFront",
            "Effect": "Allow",
            "Action": "cloudfront:CreateInvalidation",
            "Resource": "arn:aws:cloudfront::ACCOUNT_ID:distribution/DISTRIBUTION_ID"
          }
        ]
      }
      ```
- [ ] Name it `foscanti-web-deploy` → **Create policy**

> Note the S3 resource appears twice on purpose: `...:BUCKET_NAME` (no `/*`) for
> `ListBucket`, and `...:BUCKET_NAME/*` (with `/*`) for Put/Delete. Mixing these up
> is the #1 cause of Access Denied during deploy.

## Phase 5 — IAM role (the thing GitHub assumes)

- [ ] IAM → **Roles** → **Create role** → **Web identity**
- [ ] Identity provider: `token.actions.githubusercontent.com`
- [ ] Audience: `sts.amazonaws.com`
- [ ] GitHub organization: `foscanti`  ·  Repository: `foscanti-web`  ·  Branch: `master`
- [ ] **Next** → attach the `foscanti-web-deploy` policy → **Next**
- [ ] Name it `github-actions-foscanti-web-deploy` → **Create role**
- [ ] Copy the **Role ARN** (`arn:aws:iam::ACCOUNT_ID:role/github-actions-foscanti-web-deploy`)

If your console lacks the org/repo/branch fields, verify the role's **Trust
relationships** tab matches:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Federated": "arn:aws:iam::ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com" },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": { "token.actions.githubusercontent.com:aud": "sts.amazonaws.com" },
        "StringLike": { "token.actions.githubusercontent.com:sub": "repo:foscanti/foscanti-web:ref:refs/heads/master" }
      }
    }
  ]
}
```

## Phase 6 — GitHub secrets & variables

Repo → **Settings → Secrets and variables → Actions**.

- [ ] **Secrets** tab → New repository secret: `AWS_ROLE_ARN` = the Role ARN from Phase 5
- [ ] **Variables** tab → New repository variable: `AWS_REGION` = your bucket region
- [ ] **Variables** tab → New repository variable: `S3_BUCKET` = `BUCKET_NAME`
- [ ] **Variables** tab → New repository variable: `CLOUDFRONT_DISTRIBUTION_ID` = `DISTRIBUTION_ID`

## Phase 7 — Deploy

- [ ] Merge PR #1 into `master` (this triggers the workflow)
- [ ] Repo → **Actions** tab → watch the **Deploy to S3 + CloudFront** run go green
- [ ] Visit the CloudFront URL (`https://xxxx.cloudfront.net`) and test `/`, `/about/`, `/contact/`

After the first deploy, you can also re-run manually from the Actions tab
(**Run workflow**), and every future push to `master` deploys automatically.

---

## Optional next step — custom domain

To serve at `foscanti.com` with HTTPS:
1. Request a certificate in **ACM (us-east-1)** for your domain.
2. Add the domain as an **Alternate domain name (CNAME)** on the CloudFront distribution
   and select the certificate.
3. Point your DNS (Route 53 alias, or a CNAME) at the CloudFront domain name.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| `AccessDenied` on every page | Phase 2 bucket policy not pasted, or bucket policy ARN wrong |
| Homepage works, `/about/` errors | CloudFront Function missing / not associated (Phase 2) |
| Workflow fails at "Configure AWS credentials" | `AWS_ROLE_ARN` wrong, or trust policy `sub` doesn't match repo/branch |
| Workflow fails at "Sync to S3" with AccessDenied | Phase 4 policy bucket name wrong, or the `/*` vs no-`/*` distinction |
| Old content after deploy | CloudFront cache — the workflow invalidates `/*`; give it a minute |
