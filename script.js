let notFoundCounter = 0;
const maxNotFoundAttempts = 5;

// Function 1: Check for the success toast message with multiple selectors
function checkForSuccessMessage() {
    return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
            
            let messageFound = false;

            // PRIMARY SELECTOR: Targets the <p> element with the specific class list
            const successMessage = document.querySelector('p._7ba27260.ce3ac449._6a214c8b._33d541f6.d36a0790.ab738c15._37b5e1f2._1b729ebb._09ef00dc._0e0b7035');

            if (successMessage) {
                const text = successMessage.textContent.trim();
                
                // Flexible check for success message text
                if (text === "Deletion was successful." || 
                    text.includes("successfully deleted") ||
                    text.includes("Successfully deleted")) {
                    console.log(`Success message detected via class selector: "${text}"`);
                    messageFound = true;
                }
            }
            
            // FALLBACK SELECTOR: Use the previous data-test attribute as a safety net
            if (!messageFound) {
                const fallbackMessage = document.querySelector('div[data-test-artdeco-toast-item-type="success"] p.artdeco-toast-item__message');
                if (fallbackMessage && fallbackMessage.textContent.trim().includes("successful")) {
                     console.log("Success message detected via fallback selector.");
                     messageFound = true;
                }
            }
            
            if (messageFound) {
                 clearInterval(checkInterval);
                 resolve(true);
            }

        }, 1000); 

        setTimeout(() => {
            clearInterval(checkInterval);
            console.log("Timeout: Success message not found within 30 seconds.");
            resolve(false);
        }, 30000);
    });
}

// Function 2: Click the initial Edit (Pencil) icon
function clickFirstButton() {
    // ✅ Fixed: use attribute-only selector to match <a> or <button>
    let firstButton = document.querySelector('[data-view-name="skill-edit-icon"]');

    if (firstButton) {
        firstButton.click();
        console.log("Edit skill link clicked successfully");
        notFoundCounter = 0; 
        setTimeout(clickDeleteSkillButton, 2000); 
        return true;
    } else {
        notFoundCounter++;
        console.log(`Edit skill button not found. Attempt ${notFoundCounter} of ${maxNotFoundAttempts}.`);
        if (notFoundCounter >= maxNotFoundAttempts) {
            displayThankYouMessage("The edit button could not be found after several attempts.");
            return false;
        }
        setTimeout(runProcess, 2000); 
        return true; 
    }
}

// Function 3: Click the "Delete skill" button in the form
function clickDeleteSkillButton() {
    let deleteButton = document.querySelector('button[data-view-name="form-delete-button"]');
    
    if (deleteButton) {
        deleteButton.click();
        console.log("'Delete skill' button clicked successfully");
        setTimeout(clickFinalDeleteButton, 1000);
        return;
    }
    
    console.log("'Delete skill' button not found");
}

// Function 4: Click the final "Delete" confirmation button
function clickFinalDeleteButton() {
    let finalDeleteSpan = Array.from(document.querySelectorAll('span')).find(
        span => span.textContent.trim() === 'Delete'
    );
    
    if (finalDeleteSpan) {
        let finalDeleteButton = finalDeleteSpan.closest('button');
        if (finalDeleteButton) {
            finalDeleteButton.click();
            console.log("Final 'Delete' confirmation button clicked successfully");
            return;
        }
    }
    
    console.log("Final 'Delete' confirmation button not found");
}

function displayThankYouMessage(reason) {
    console.log("%c Thank you for using the script! %c\n\n" +
                `${reason}\n` +
                "You can visit github.com/hv33y for more useful scripts. \n\n" +
                "Have a great day!", 
                "background: #222; color: #bada55; font-size: 20px; font-weight: bold;", 
                "background: #fff; color: #000; font-size: 16px;");
}

function checkForEmptyState() {
    const emptyState = document.querySelector('section.full-width.artdeco-empty-state');
    if (emptyState && emptyState.textContent.includes("When you add new skills they'll show up here")) {
        displayThankYouMessage("All skills have been successfully deleted.");
        return true;
    }
    return false;
}

// Main execution loop
async function runProcess() {
    if (checkForEmptyState()) {
        return;
    }
    
    if (!clickFirstButton()) {
        return; 
    }

    const success = await checkForSuccessMessage();
    if (success) {
        console.log("Starting next deletion cycle...");
        setTimeout(runProcess, 1000);
    } else {
        console.log("Stopping the process due to missing success message or process failure.");
    }
}

runProcess();
