#!/usr/bin/env python3
"""Parse glacier_user_dump.txt into glaciertrailsIcadventreexplrdata.json."""

from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path


def _tone(status: str) -> str:
    s = status.lower()
    if any(
        x in s
        for x in (
            "retreat",
            "reced",
            "thinning",
            "rapidly retreat",
            "rapidly changing",
        )
    ):
        return "negative"
    if any(
        x in s
        for x in (
            "advanc",
            "mostly stable",
            "flowing toward",
            "surging",
            "stable / slowly",
        )
    ):
        return "positive"
    return "neutral"


def _slug(name: str) -> str:
    nk = unicodedata.normalize("NFKD", name)
    nk = "".join(ch for ch in nk if not unicodedata.combining(ch))
    s = nk.lower().replace("’", "'")
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-+", "-", s).strip("-")
    return s or "glacier"


def _parse_block(block: str) -> dict | None:
    lines = [ln.rstrip() for ln in block.strip().splitlines() if ln.strip()]
    if not lines:
        return None
    m = re.match(r"^\d+\.\s*(.+)$", lines[0].strip())
    if not m:
        return None
    name = m.group(1).strip()

    fields: dict[str, str] = {}
    i = 1
    while i < len(lines):
        ln = lines[i]
        if ln.startswith("About"):
            break
        if ":" in ln:
            key, val = ln.split(":", 1)
            fields[key.strip().lower()] = val.strip()
        i += 1

    about_lines: list[str] = []
    if i < len(lines) and lines[i].startswith("About"):
        i += 1
        while i < len(lines) and not lines[i].startswith("Key Facts"):
            about_lines.append(lines[i])
            i += 1

    facts: list[str] = []
    if i < len(lines) and lines[i].startswith("Key Facts"):
        i += 1
        while i < len(lines):
            raw = lines[i].strip()
            raw = re.sub(r"^[•\-\u2022\*]\s*", "", raw)
            if raw:
                facts.append(raw)
            i += 1

    about = "\n".join(about_lines).strip()

    def pick(*keys: str) -> str:
        for k in keys:
            v = fields.get(k)
            if v:
                return v
        return ""

    status = pick("status")
    row = {
        "id": _slug(name),
        "name": name,
        "coordinates": pick("coordinates"),
        "glacierType": pick("type"),
        "location": pick("location"),
        "status": status,
        "statusTone": _tone(status),
        "area": pick("area"),
        "elevation": pick("elevation"),
        "temp": pick("temp"),
        "about": about,
        "keyFacts": facts,
    }
    if not row["coordinates"] or not row["glacierType"]:
        return None
    return row


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    dump_paths = [
        root / "GlacierTrailsIcadventre" / "GlacierTrailsIcadventredata" / "glacier_user_dump.txt",
    ]
    text_parts: list[str] = []
    for p in dump_paths:
        if p.exists():
            text_parts.append(p.read_text(encoding="utf-8"))
    text = "\n\n".join(text_parts).strip()
    if not text:
        raise SystemExit("Missing glacier_user_dump.txt")

    chunks = re.split(r"\n(?=\d+\.\s)", text)
    out: list[dict] = []
    for ch in chunks:
        row = _parse_block(ch)
        if row:
            out.append(row)

    if len(out) < 10:
        raise SystemExit(f"Expected many glaciers, got {len(out)}")

    target = (
        root
        / "GlacierTrailsIcadventre"
        / "GlacierTrailsIcadventredata"
        / "glaciertrailsIcadventreexplrdata.json"
    )
    target.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(out)} glaciers -> {target}")


if __name__ == "__main__":
    main()
