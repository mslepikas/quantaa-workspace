# Nonaym DIY Phase 10BC — Download and Checksum Result

Status: Passed

Date: 2026-05-24

## Scope

Phase 10BC performed download-only and checksum-only work on omnieon.

No image writing occurred.
No disk partitioning occurred.
No formatting occurred.
No mounting occurred.
No target machine was touched.
No action was taken against UnifiPi.
No action was taken against Protectli / ns2 quantaa.

## Artifact folder

Local artifact folder:

- nonaym-dns/artifacts/raspios-lite-64bit-20260421/

## Downloaded artifact

- Image: nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz
- Size on disk: 551M
- Source URL: official HTTPS Raspberry Pi downloads domain
- Candidate: Raspberry Pi OS Lite 64-bit
- Release date: 21 Apr 2026
- Debian version: 13 / trixie
- Kernel version: 6.12

## SHA256 verification

Expected SHA256:

- 4cd31df026fd82243805a326dc0cafd7383f7e3d30c9413e7044d507aae281e2

Verification command:

- sha256sum -c nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz.sha256

Result:

- PASS
- nonaym-diy-rpi-base-raspios-lite-64bit-20260421.img.xz: OK

## Git handling

The downloaded image is a large local artifact and must not be committed to Git.

Only lightweight documentation, checksum, provenance, and ignore rules may be committed.

## Phase 10BC verdict

PASS.

The official Raspberry Pi OS Lite 64-bit candidate image was downloaded locally and checksum verified.

Still forbidden until later reviewed phases:

- No image writing.
- No disk partitioning.
- No formatting.
- No package installs.
- No DNS changes.
- No service changes.
- No reboot.
- No write action against Protectli / ns2 quantaa.
- No actual write action against Raspberry Pi / UnifiPi.
