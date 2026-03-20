# Setup Guide: Connect Enquiries to Google Sheets

Since you want a completely free and unlimited way to "save data to the internet", we have successfully built a system that will send all new enquiries straight to a Google Spreadsheet!

Follow these 5 simple steps to get your Web App URL.

## Step 1: Create the Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com/) and create a blank spreadsheet.
2. Name it something like **"Gravitech Global Inquiries"**.
3. In the first row, add these headers in columns A through F exactly:
   - `Timestamp`
   - `Name`
   - `Email`
   - `Phone`
   - `Profession`
   - `Course`

## Step 2: Open the Code Editor
1. In the top menu of your spreadsheet, click on **Extensions** > **Apps Script**.
2. A new tab will open with a blank code file called `Code.gs`.

## Step 3: Paste this Code
Delete any existing code in that file, and paste the following snippet:

```javascript
const SHEET_NAME = 'Sheet1'; // Make sure this matches your sheet tab name!

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = JSON.parse(e.postData.contents);
    
    // Append the row matching your headers
    sheet.appendRow([
      data.timestamp || new Date(),
      data.name,
      data.email,
      data.phone,
      data.profession,
      data.course
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```
*Click the **Save (Floppy Disk)** icon.*

## Step 4: Deploy as a Web App
1. In the top right corner, click the blue **Deploy** button > **New deployment**.
2. Click the specific gear icon next to "Select type" and choose **Web app**.
3. Fill in the settings exactly like this:
   - **Description**: "Enquiry Form API"
   - **Execute as**: "Me (your email)"
   - **Who has access**: "Anyone" *(This is critical so your website can send data to it!)*
4. Click **Deploy**. *(Google will ask you to authorize access—click Advanced > Go to Untitled Project and Allow).*

## Step 5: Add the URL to your Code
1. Google will show you a long **Web app URL** that looks like `https://script.google.com/macros/s/.../exec`. Copy it!
2. Go to your local code editor. Create a file called `.env` in the root of your `c:\projects\gg_portfolio\` project folder.
3. Add this line:
   ```env
   GOOGLE_SHEET_WEB_APP_URL="replace_this_with_your_long_url"
   ```
4. Restart your `npm run dev` server!

---
> [!TIP]
> Right now if you test the "Enquire Now" button without doing these steps, I have designed the code to still show a **Success Animation!** It will print out a warning in your terminal saying the link isn't configured yet, but it allows you to test the beautiful UI immediately!
