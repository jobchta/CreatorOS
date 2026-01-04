from playwright.sync_api import sync_playwright

def verify_new_tiers():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Calendar
        print("Visiting Calendar...")
        page.goto("http://localhost:3001/dashboard/calendar")
        page.wait_for_selector("text=Content Calendar")
        # Check for idea backlog
        page.wait_for_selector("text=Idea Backlog")
        # Check for calendar days
        page.wait_for_selector("text=Sun")
        page.screenshot(path="verification/calendar.png", full_page=True)
        print("Calendar screenshot taken.")

        # 2. Deals
        print("Visiting Deals...")
        page.goto("http://localhost:3001/dashboard/deals")
        page.wait_for_selector("text=Brand Deal CRM")
        # Check for Kanban columns
        page.wait_for_selector("text=Prospects")
        page.wait_for_selector("text=Active / In Progress")
        page.screenshot(path="verification/deals_crm.png", full_page=True)
        print("Deals CRM screenshot taken.")

        # 3. Collabs
        print("Visiting Collabs...")
        page.goto("http://localhost:3001/dashboard/collabs")
        page.wait_for_selector("text=Creator Marketplace")
        # Check for creator card
        page.wait_for_selector("text=Connect")
        page.screenshot(path="verification/collabs.png", full_page=True)
        print("Collabs screenshot taken.")

        # 4. Monetization
        print("Visiting Monetization...")
        page.goto("http://localhost:3001/dashboard/monetization")
        page.wait_for_selector("text=Monetization")
        # Check for sub-features
        page.wait_for_selector("text=Link-in-Bio Page")
        page.wait_for_selector("text=Digital Store")
        page.screenshot(path="verification/monetization.png", full_page=True)
        print("Monetization screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_new_tiers()
