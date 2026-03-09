# LinkedIn Skills Bulk Deleter

A small JavaScript automation script that helps remove all LinkedIn skills automatically.

Instead of manually deleting skills one by one, this script automates the process by:

- Opening the **edit skill modal**
- Clicking **Delete skill**
- Confirming deletion
- Waiting for the **success toast message**
- Repeating until all skills are deleted

---

## ⚠️ Disclaimer

This script is provided for **educational and productivity purposes only**.

- Use at your own risk.
- LinkedIn UI changes may break the script.
- This project is **not affiliated with LinkedIn**.

---

## Features

✔ Bulk delete LinkedIn skills  
✔ Smart success detection  
✔ Retry logic when elements are missing  
✔ Stops automatically when no skills remain  
✔ Console logging for transparency  

---

## How It Works

The script performs the following steps:

1. Click the **Edit (Pencil) icon**
2. Click **Delete skill**
3. Confirm **Delete**
4. Wait for the success toast message
5. Start the next deletion cycle
6. Stop when all skills are removed

---

## Installation

Clone the repository:

```bash
git clone https://github.com/wldbaig/linkedin-skills-bulk-delete.git
```

---

## Usage

**Step 1** — Open your LinkedIn Profile and scroll to SKILLs section:

```
https://www.linkedin.com/in/YOUR_PROFILE
```

**Step 2** — Open Chrome Developer Tools:

```
F12   or   Right Click → Inspect
```

**Step 3** — Go to the **Console** tab.

**Step 4** — Paste the script:

Open `script.js`, copy everything, paste it into the console, and press **Enter**.

**Step 5** — The script will automatically start deleting skills. You will see logs like:

```
Edit skill button clicked
Delete skill button clicked
Success message detected
Starting next deletion cycle
```

**To stop the script:** Refresh the page (`F5`).

---

## Example Output

```
Edit skill button clicked successfully
'Delete skill' button clicked successfully
Final 'Delete' confirmation button clicked successfully
Success message detected
Starting next deletion cycle...
```

---

## Limitations

- LinkedIn UI updates may break selectors
- Requires manual console execution
- Works best in Chrome

---

## Contributing

Pull requests are welcome. If LinkedIn changes selectors, feel free to update the script and submit improvements.

---

## Author

**Waleed Baig**  
Senior .NET Engineer  
Backend | Microservices | Azure | Distributed Systems
