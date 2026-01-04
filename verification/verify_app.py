from playwright.sync_api import sync_playwright

def verify_logic_loom():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Visit Home Page
        print("Visiting Home Page...")
        page.goto("http://localhost:3001")
        page.wait_for_selector("text=Stop Playing Content Creator")
        page.screenshot(path="verification/home_page.png", full_page=True)
        print("Home page screenshot taken.")

        # 2. Visit Rate Calculator
        print("Visiting Rate Calculator...")
        page.goto("http://localhost:3001/tools/rate-calculator")
        page.wait_for_selector("text=Brand Rate Calculator")

        # Interact with Calculator
        page.fill("input[type='number']", "50000")

        # Select Platform (first select element)
        page.locator("select").nth(0).select_option("instagram")

        # Select Niche (second select element)
        page.locator("select").nth(1).select_option("tech")

        # Click Calculate
        page.click("button[type='submit']")

        # Wait for result
        page.wait_for_selector("text=Estimated Rate per Post")
        page.screenshot(path="verification/rate_calculator.png", full_page=True)
        print("Rate calculator screenshot taken.")

        # 3. Visit Engagement Analyzer
        print("Visiting Engagement Analyzer...")
        page.goto("http://localhost:3001/tools/engagement-analyzer")
        page.wait_for_selector("text=Engagement Analyzer")

        # Interact with Analyzer
        # Inputs: Followers, Likes, Comments
        # There are three inputs.
        # 1st: Total Followers
        # 2nd: Likes
        # 3rd: Comments

        inputs = page.locator("input[type='number']")
        inputs.nth(0).fill("10000")
        inputs.nth(1).fill("500")
        inputs.nth(2).fill("50")

        page.click("button[type='submit']")

        # Wait for result
        page.wait_for_selector("text=Quality Score")
        page.screenshot(path="verification/engagement_analyzer.png", full_page=True)
        print("Engagement analyzer screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_logic_loom()
