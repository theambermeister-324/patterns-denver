# CongaLine Config — Drop Zone

Aaron Stone (Crux Digital) will add files here before June 11:

- `demo.yaml` — pre-configured manifest for the workshop fleet
- `demo.env.example` — environment variable template (copy to `demo.env`, add your keys)
- `conga-policy.yaml.example` — starting governance policy for participants to modify

Once these appear, participants run:

```bash
cp conga/demo.env.example conga/demo.env
# Edit conga/demo.env

conga manifest apply conga/demo.yaml --env-file conga/demo.env
```

See `ADVANCED.md` for the full setup guide.
