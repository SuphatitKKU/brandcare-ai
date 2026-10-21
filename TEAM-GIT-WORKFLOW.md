# คู่มือสำหรับเพื่อนและ AI ของเพื่อน — ส่งงานเข้า BrandCare

**ผู้รับเอกสาร: เพื่อนที่ร่วมทีม และ AI ที่ทำงานบนเครื่องของเพื่อนคนนั้น**

คู่มือนี้ให้เพื่อนส่งต่อให้ AI ของตัวเอง เพื่อให้ AI ติดตั้งเครื่องมือและจัดการ Git ให้ครบ ไม่ใช่รายการคำสั่งให้คนที่ส่งคู่มือนี้ไปทำ และไม่ใช่คำสั่งให้ติดตั้งหรือ push บนเครื่องของคนส่ง

เพื่อนเพียงเปิดโปรเจกต์ใน AI ของตนเอง แนบไฟล์นี้พร้อมระบุหน้าที่ได้รับมอบหมายและ URL repo ของทีมถ้ายังไม่มี แล้วส่งข้อความด้านล่าง AI เป็นคนทำคำสั่งทั้งหมดในเอกสาร เพื่อนช่วยเฉพาะการยืนยันบัญชี/2FA หรือสิทธิ์ติดตั้งที่ระบบบังคับให้คนยืนยัน ตัวอย่างคำสั่งใช้ PowerShell บน Windows

ลำดับงาน: **ติดตั้งและตรวจสิทธิ์ → สร้าง branch จาก main ล่าสุด → ทำงานและทดสอบ → commit → push → เปิด PR → rebase กับ main ล่าสุด → ทดสอบอีกครั้ง → merge ผ่าน PR**

## เพื่อนคัดลอกข้อความนี้ส่งให้ AI ของตัวเอง

> คุณคือ AI ที่ทำงานบนเครื่องของสมาชิกทีม BrandCare ผู้ที่ส่งข้อความนี้ให้คุณ โปรดอ่านคู่มือ Git ไฟล์นี้ พร้อม MOCKUP-PAGES.md และ AGENTS.md ในโปรเจกต์ก่อน เริ่มจากตรวจและติดตั้ง Git กับ GitHub CLI บนเครื่องนี้ให้พร้อมด้วยตัวเองถ้ายังไม่มี ไม่ต้องให้ฉันพิมพ์คำสั่งเอง จากนั้นตรวจบัญชีและ repository ของทีม สร้าง branch แยกสำหรับหน้าที่ฉันได้รับมอบหมาย ใช้ไฟล์กลางของทีม เมื่อทำงานเสร็จให้ทดสอบ commit push และเปิด PR เข้า main ก่อน merge ต้อง fetch และ rebase กับ origin/main ล่าสุด แก้ conflict โดยรักษางานของทีมแล้วทดสอบใหม่ ถ้าฉันยังไม่ได้สั่ง merge ให้ส่งลิงก์ PR พร้อมผลตรวจ เมื่อฉันสั่ง merge ให้ทำต่อจนเสร็จ ถ้าติดขั้นตอน login/2FA หรือสิทธิ์ติดตั้งที่ระบบต้องให้มนุษย์ยืนยัน ให้ฉันช่วยเฉพาะขั้นตอนนั้นแล้วดำเนินงานต่อ การทำงานทั้งหมดอยู่บนเครื่องและ branch ของฉัน ไม่ใช่เครื่องของเพื่อนที่ส่งคู่มือนี้มา


## 1. กติกาสำหรับ AI

- รันคำสั่งทีละขั้น ตรวจ exit code และผลลัพธ์ก่อนทำขั้นถัดไป อย่ารันข้าม error
- ใช้ repository ของทีมที่เพื่อนเจ้าของเครื่องระบุ ตรวจ `origin` ก่อน push และตรวจ PR ว่าปลายทางเป็น `main` ของ repo เดียวกัน
- **Repository ของทีม:** `https://github.com/SuphatitKKU/brandcare-ai` (Private) ตรวจ `origin` ว่าตรงกับ repo นี้ก่อน push หากยังไม่มี checkout ให้ใช้ `gh repo clone SuphatitKKU/brandcare-ai` ลงโฟลเดอร์ใหม่บนเครื่องของเพื่อน ห้ามสร้าง repository ใหม่แทนของทีม
- โฟลเดอร์โปรเจกต์ที่เพื่อนได้รับอาจเป็นสำเนาไฟล์ที่ไม่มี `.git` ให้ตรวจจริงก่อน ห้าม `git init` เพื่อสร้างประวัติแยกจากทีม ให้ clone repo ของทีมลงโฟลเดอร์ใหม่ แล้วคัดลอกเฉพาะไฟล์งานเข้าไปหลังตรวจ diff
- หนึ่งงานต่อหนึ่ง branch ของตนเอง ใช้ `feat/<ชื่อหรือบทบาท>-<ชื่องาน>` หรือ `fix/<ชื่อหรือบทบาท>-<ชื่องาน>` เช่น `feat/oak-issue-detail` เปลี่ยนตามงานจริง
- ไม่ทำงานหรือ push ตรงเข้า `main` ไม่ force-push `main` และไม่ rebase branch ที่หลายคนใช้งานร่วมกันโดยไม่ประสานเจ้าของงาน
- ห้ามล้างงานด้วย `git reset --hard`, `git clean -fd` หรือแก้ conflict ด้วยการเลือก `ours`/`theirs` ทั้งไฟล์แบบอัตโนมัติ
- ตรวจไฟล์ก่อน stage ไม่ใช้ `git add .` แบบไม่อ่าน diff ไม่ commit `.env`, token, log, ไฟล์ส่วนตัว หรือไฟล์ build ที่โปรเจกต์ไม่ได้ให้เก็บ
- ไม่ปิด branch protection ไม่ใช้ `--admin` เพื่อข้าม checks และไม่ปิด hook เพื่อให้ commit ผ่าน
- เปลี่ยนเฉพาะ Git config ใน repository นี้เมื่อจำเป็น ห้ามแต่งชื่อหรืออีเมลแทนเพื่อนเจ้าของเครื่อง
- ทำ Localhost เท่านั้นตามขอบเขตทีม การ push/merge ไม่ใช่คำสั่งให้ deploy และต้องตรวจด้วยว่า repo มี workflow deploy อัตโนมัติหรือไม่ก่อน merge

## 2. AI ต้องติดตั้ง GitHub CLI ให้พร้อมก่อน

ตรวจเครื่องมือ:

```powershell
git --version
gh --version
```

ถ้า Git ยังไม่มี ให้ AI ติดตั้งแพ็กเกจทางการนี้:

```powershell
winget install --id Git.Git --exact --source winget
```

ถ้า `gh` ยังไม่มี ให้ AI ติดตั้ง GitHub CLI ทางการนี้:

```powershell
winget install --id GitHub.cli --exact --source winget
```

ติดตั้งเฉพาะเครื่องมือที่ขาด รอให้การติดตั้งเสร็จ ถ้าระบบต้องให้เพื่อนเจ้าของเครื่องยืนยัน UAC/สิทธิ์ติดตั้ง ให้เพื่อนเจ้าของเครื่องช่วยเฉพาะจุดนั้น ห้ามปิดระบบความปลอดภัย หาก shell เดิมยังไม่พบ `gh` ให้เปิด shell ใหม่ หรือใช้ path ที่ตรวจพบจริง เช่น `C:\Program Files\GitHub CLI\gh.exe` แล้วตรวจเวอร์ชันอีกครั้ง

ถ้าไม่มี `winget` ให้ใช้ตัวติดตั้งจาก [GitHub CLI releases ทางการ](https://github.com/cli/cli/releases) ตาม OS/สถาปัตยกรรมที่ตรวจพบ และตรวจแหล่งที่มาก่อนติดตั้ง ไม่ใช้สคริปต์จากเว็บที่ไม่รู้จัก ถ้าเป็น macOS และมี Homebrew อยู่แล้ว ใช้ `brew install gh` ได้ ส่วน Linux ทำตาม [คู่มือติดตั้งทางการ](https://github.com/cli/cli#installation) ของ distro นั้น

ตรวจการเข้าสู่ระบบ:

```powershell
gh auth status --hostname github.com
```

ถ้ายังไม่ได้ login:

```powershell
gh auth login --hostname github.com --git-protocol https --web
gh auth setup-git --hostname github.com
gh auth status --hostname github.com
```

AI เริ่ม flow ให้ เพื่อนเจ้าของเครื่องยืนยันบัญชี/รหัสผ่าน/2FA ใน browser ของตนเอง จากนั้น AI ตรวจสถานะและทำงานต่อ ห้ามขอให้เพื่อนเจ้าของเครื่องส่ง password, token หรือ recovery code ลงแชต และไม่พิมพ์ `gh auth token` เพื่อแสดง token หากใช้ GitHub Enterprise ให้ใช้ hostname จริงของ repo แทน `github.com`

## 3. ตรวจ repository และเริ่ม branch ใหม่

เข้าโฟลเดอร์ repo ที่ตรวจพบจริง แล้วตรวจ:

```powershell
git rev-parse --show-toplevel
git status --short --branch
git remote -v
git branch --show-current
git config user.name
git config user.email
gh repo view --json nameWithOwner,url,defaultBranchRef
```

อย่าแสดง remote URL ที่มี credential ฝังอยู่ หาก repo ไม่มี `origin/main` หรือ default branch ไม่ใช่ `main` ให้ตรวจข้อตกลงทีมก่อน ห้ามสร้างหรือเปลี่ยน default branch เอง

ถ้ามีไฟล์แก้ค้างอยู่ ให้ตรวจว่าเป็นงานของใครก่อนย้าย branch งานที่เป็นของ task นี้ให้สร้าง branch รับงานอย่างเหมาะสมและ commit แยกก่อน rebase งานอื่นต้องรักษาไว้ ห้าม stash/ทิ้ง/commit งานของคนอื่นแบบเงียบๆ ตัวอย่างถัดไปใช้เมื่อ working tree สะอาดเท่านั้น

```powershell
git fetch origin --prune
git switch main
git pull --ff-only origin main
$branch = 'feat/ชื่อเจ้าของงาน-ชื่องาน'
git check-ref-format --branch $branch
git switch -c $branch
```

ตั้ง `$branch` เป็นชื่อจริงก่อนรัน ถ้าชื่อนี้มีอยู่แล้ว ให้ตรวจว่าเป็นงานเดิมที่ต้องทำต่อหรือไม่ อย่าสร้างทับ ถ้า local `main` มี commit ที่ยังไม่อยู่บน remote จน `--ff-only` ไม่ผ่าน ให้ตรวจและเก็บงานก่อน ไม่ reset ทิ้ง

ถ้าไม่มี local `main` แต่มี `origin/main` ใช้ `git switch --track -c main origin/main` แทน `git switch main` แล้วค่อยสร้าง feature branch

## 4. ทำงาน ทดสอบ และ commit

อ่าน `MOCKUP-PAGES.md` เพื่อดูหน้าที่รับผิดชอบ ใช้ shell/theme/data จาก `shared/` ร่วมกัน ไม่วาด Header หรือ Bottom nav ซ้ำในแต่ละหน้า หากแก้ไฟล์กลางให้ระบุใน PR เพื่อให้เพื่อนตรวจผลกระทบ

ก่อน commit:

```powershell
git status --short
git diff --check
git diff --stat
git diff
```

รันคำสั่งตรวจตามโปรเจกต์จริง สำหรับ mockup ชุดนี้ตรวจ syntax ของไฟล์ JS ที่แก้ และรัน Localhost ด้วย `npm run dev` ดูหน้า Desktop/Mobile รวมลิงก์ เมนู และ console error ไม่รัน server ซ้ำหาก port ถูกใช้โดย server ของโปรเจกต์นี้อยู่แล้ว ถ้า repo มี build/lint/tests ให้รันรายการที่เกี่ยวข้องด้วย

Stage เฉพาะไฟล์ที่อ่านและตั้งใจส่งแล้ว ตัวอย่างนี้ให้แทน path ด้วยไฟล์จริงของ task:

```powershell
git add -- 'path/to/changed-file.js' 'path/to/changed-file.css'
git diff --cached --check
git diff --cached
git commit -m "feat: describe the completed change"
```

## 5. Push และเปิด Pull Request

ยืนยันว่า branch ปัจจุบันเป็น branch งานของตัวเองและมี commit ของงานแล้ว:

```powershell
$branch = (git branch --show-current).Trim()
if (-not $branch -or $branch -eq 'main') { throw 'ต้องอยู่บน feature branch ก่อน push' }
git push --set-upstream origin $branch
gh pr list --head $branch --base main --state open
```

ถ้ามี PR เดิมของ branch นี้ ใช้ PR เดิม หากยังไม่มี ให้สร้าง PR หลังตรวจ diff กับ `origin/main` เขียนรายละเอียดจริงลงไฟล์ UTF-8 นอก repo แล้วส่งผ่าน `--body-file`:

```powershell
git diff --stat origin/main...HEAD
$prBodyPath = Join-Path ([IO.Path]::GetTempPath()) ('brandcare-pr-' + [guid]::NewGuid().ToString() + '.md')
@'
## สิ่งที่เปลี่ยน
อธิบายหน้าที่ทำ พฤติกรรมที่ได้ และไฟล์กลางที่ได้รับผลกระทบ

## การตรวจสอบ
ระบุคำสั่งและการทดสอบหน้าจอที่รันจริง พร้อมผล
'@ | Set-Content -LiteralPath $prBodyPath -Encoding utf8
gh pr create --base main --head $branch --title 'ชื่อ PR ที่สื่อถึงงานจริง' --body-file $prBodyPath
```

ถ้างานยังไม่พร้อม review ให้ใส่ `--draft` และบอกสถานะให้ชัด ถ้าใช้ Codex และมีเครื่องมือแนบ PR ให้แนบ URL ของ PR กับแชตด้วย ส่งลิงก์และผลตรวจให้เพื่อนเจ้าของเครื่อง ห้ามอ้างว่า merge แล้วจากการเปิด PR อย่างเดียว

## 6. Rebase ก่อน merge ทุกครั้ง

ต้อง commit งานให้ครบและ working tree สะอาดก่อนเริ่ม ห้าม rebase ระหว่างยังมี conflict จาก operation อื่น

```powershell
$branch = (git branch --show-current).Trim()
if (-not $branch -or $branch -eq 'main') { throw 'ห้าม rebase main ในขั้นตอนนี้' }
git status --short
git fetch origin --prune
git rev-list --left-right --count "HEAD...origin/$branch"
```

ผล `rev-list` คือ **จำนวน commit ฝั่ง local ที่ remote ไม่มี / จำนวน commit ฝั่ง remote ที่ local ไม่มี** ถ้าตัวหลังมากกว่า 0 ต้องอ่าน commits ของ remote ก่อน แปลว่ามีงานที่ยังไม่ได้รับมา ห้าม force-push ทับ ให้รวมงานที่เกี่ยวข้องและประสานเจ้าของ branch เมื่อจำเป็น

เมื่อยืนยันว่า branch นี้เป็นของตัวเองและไม่มีงาน remote ที่ตกหล่น เก็บหัว remote ไว้เป็นเงื่อนไขก่อนเขียนทับ และสร้าง backup branch ในเครื่อง:

```powershell
$remoteBeforeRebase = (git rev-parse "refs/remotes/origin/$branch").Trim()
$backupBranch = 'backup/' + $branch + '-' + (Get-Date -Format 'yyyyMMdd-HHmmss')
git branch $backupBranch
git rebase origin/main
```

### ถ้ามี conflict

1. รัน `git status` แล้วอ่านไฟล์ที่ขัดแย้ง รวมทั้ง commit ของทั้งสองฝั่ง
2. แก้เฉพาะส่วนขัดแย้ง รักษาฟีเจอร์ของเพื่อนและงานของตัวเอง ให้ shared components และข้อมูลกลางยังเข้ากัน
3. Stage เฉพาะไฟล์ที่แก้แล้ว จากนั้น continue:

```powershell
git add -- 'path/to/resolved-file'
git rebase --continue
```

ทำซ้ำจนจบ หากตัดสินความหมายของการเปลี่ยนแปลงไม่ได้ ให้หยุดและรายงานจุดที่ต้องให้เจ้าของงานช่วย ห้าม `git rebase --skip` เพื่อข้ามงานเอง ถ้าจำเป็นต้องกลับไปสถานะก่อน rebase ใช้:

```powershell
git rebase --abort
```

### หลัง rebase สำเร็จ

ทดสอบ syntax/build/lint/tests ที่เกี่ยวข้องและหน้า Desktop/Mobile ใหม่ ตรวจ diff แล้ว push โดยล็อกเงื่อนไขกับหัว remote ที่เก็บไว้:

```powershell
git diff --check
git diff --stat origin/main...HEAD
git log --oneline origin/main..HEAD
git status --short
git push "--force-with-lease=refs/heads/${branch}:$remoteBeforeRebase" origin "HEAD:refs/heads/$branch"
```

ใช้ force-with-lease เฉพาะ feature branch ของตนเองที่ถูก rebase แล้วเท่านั้น หาก lease ถูกปฏิเสธ แปลว่า remote เปลี่ยนระหว่างทำงาน ให้ fetch แล้วตรวจ commits ใหม่ ห้ามเปลี่ยนไปใช้ `--force` และห้ามเพียงอัปเดตค่า lease เพื่อทับงานใหม่

## 7. ตรวจ PR และ merge เข้า main

การอ่านคู่มือนี้ไม่ใช่คำสั่งให้ merge อัตโนมัติ หากเพื่อนเจ้าของเครื่องยังไม่ได้สั่ง merge ให้จบที่ PR พร้อม review เมื่อได้รับคำสั่ง merge แล้วให้ทำต่อโดยไม่ถามซ้ำเรื่องที่ได้รับอนุญาตไปแล้ว

กำหนด `$prNumber` จาก PR ที่เพิ่งเปิดหรือ PR ของ task นี้จริง แล้วตรวจ:

```powershell
gh pr view $prNumber --json url,baseRefName,headRefName,headRefOid,isDraft,mergeable,mergeStateStatus,reviewDecision,statusCheckRollup
gh pr checks $prNumber --required --watch
```

ต้องตรง repo / branch / base `main`, ไม่เป็น draft, ไม่มี conflict และผ่านข้อกำหนด review/checks ของ repo หากไม่ได้ตั้ง required checks ให้ระบุข้อเท็จจริงนั้นและใช้ผลทดสอบโปรเจกต์ ห้ามนับว่า error ของ CLI คือ checks ผ่าน

ก่อน merge ให้ fetch อีกครั้งและยืนยันว่า feature branch รวม `main` ล่าสุดแล้ว:

```powershell
git fetch origin --prune
git merge-base --is-ancestor origin/main HEAD
```

ถ้า exit code ไม่ใช่ 0 เพราะ `main` มี commit ใหม่ ให้กลับไปขั้นตอน rebase และทดสอบอีกครั้ง ห้าม merge ทั้งที่ยังใช้ฐานเก่า

เลือก **Rebase and merge** เพื่อรักษาประวัติเป็นเส้นตรง และล็อก commit ที่ทดสอบแล้ว:

```powershell
$testedHead = (git rev-parse HEAD).Trim()
gh pr merge $prNumber --rebase --match-head-commit $testedHead
gh pr view $prNumber --json url,state,mergedAt,mergeCommit
```

หาก repo ใช้ merge queue ให้ทำตาม queue และ required checks ของ repo ไม่ข้ามคิวด้วย `--admin` ถ้า repo ไม่อนุญาต rebase merge ให้ใช้วิธีที่ทีมกำหนดหลังตรวจนโยบายจริง ไม่เปลี่ยน repo settings เอง หาก `main` หรือ PR head ขยับระหว่างตรวจ ให้ตรวจฐาน/commit/checks ใหม่ก่อนส่ง merge อีกครั้ง

เมื่อยืนยันว่า PR เป็น `MERGED` แล้วและ working tree สะอาด อัปเดต local `main`:

```powershell
git fetch origin --prune
git switch main
git pull --ff-only origin main
git status --short --branch
```

ถ้าอยู่ใน worktree และ `main` ถูก checkout ที่อื่น ห้ามฝืน switch ให้รายงานและอัปเดตใน checkout ที่เหมาะสม เก็บ feature/backup branch ไว้ก่อน ไม่ต้องลบ branch อัตโนมัติ

## 8. สิ่งที่ AI ต้องรายงานให้เพื่อนเจ้าของเครื่อง

- Repository และ branch ที่ใช้
- เวอร์ชัน Git / GitHub CLI และผลตรวจ auth โดยไม่เปิดเผย token
- หน้าที่ทำและไฟล์กลางที่แก้
- ผลทดสอบจริง และสิ่งที่ยังตรวจไม่ได้
- rebase กับ `origin/main` commit ใด มี conflict หรือไม่ และแก้อย่างไร
- URL ของ PR พร้อมสถานะจริง: draft / พร้อม review / merged
- ถ้า merged ให้ระบุ merge commit จาก GitHub และการอัปเดต local main

## เอกสารทางการ

- [GitHub CLI: ติดตั้ง](https://github.com/cli/cli#installation)
- [GitHub CLI: เข้าสู่ระบบ](https://cli.github.com/manual/gh_auth_login)
- [GitHub CLI: สร้าง PR](https://cli.github.com/manual/gh_pr_create)
- [GitHub CLI: merge และ match-head-commit](https://cli.github.com/manual/gh_pr_merge)
- [Git: rebase, continue และ abort](https://git-scm.com/docs/git-rebase)
- [Git: push และ force-with-lease แบบระบุ expected commit](https://git-scm.com/docs/git-push)
