from playwright.sync_api import sync_playwright

def verify_dashboard():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Visit Dashboard
        print("Visiting Dashboard...")
        page.goto("http://localhost:3001/dashboard")
        page.wait_for_selector("text=Dashboard")

        # Verify charts are present (looking for text inside them or the container)
        page.wait_for_selector("text=Follower Growth")
        page.wait_for_selector("text=Engagement Volume")

        page.screenshot(path="verification/dashboard_overview.png", full_page=True)
        print("Dashboard screenshot taken.")

        # 2. Visit Connections Page
        print("Visiting Connections Page...")
        page.goto("http://localhost:3001/dashboard/connections")
        page.wait_for_selector("text=Platform Connections")

        # Toggle a connection
        # Find the button for TikTok (which is disconnected by default)
        # It should say "Connect"
        tiktok_connect_btn = page.locator("button:has-text('Connect')").first
        if tiktok_connect_btn.is_visible():
            tiktok_connect_btn.click()
            # It should now change to "Connected"
            page.wait_for_selector("text=Connected")

        page.screenshot(path="verification/dashboard_connections.png", full_page=True)
        print("Connections screenshot taken.")

        # 3. Visit Best Time Tool
        print("Visiting Best Time Tool...")
        page.goto("http://localhost:3001/tools/best-time")
        page.wait_for_selector("text=When Should You Post?")

        # Interact
        page.select_option("select:has-text('Platform')", "tiktok")
        page.click("button[type='submit']")
        page.wait_for_selector("text=Recommended Posting Slots")

        page.screenshot(path="verification/best_time_tool.png", full_page=True)
        print("Best Time Tool screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_dashboard()
