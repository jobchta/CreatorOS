from playwright.sync_api import sync_playwright
import time

def capture_portal():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        # 1. Dashboard Overview
        print("Capturing Dashboard Overview...")
        page.goto("http://localhost:3002/dashboard")
        page.wait_for_selector("text=Total Followers", timeout=10000)
        page.screenshot(path="verification/portal_1_overview.png", full_page=True)

        # 2. Content Calendar
        print("Capturing Content Calendar...")
        page.goto("http://localhost:3002/dashboard/calendar")
        page.wait_for_selector("text=Idea Backlog", timeout=10000)
        page.screenshot(path="verification/portal_2_calendar.png", full_page=True)

        # 3. Brand Deal CRM
        print("Capturing Brand Deals...")
        page.goto("http://localhost:3002/dashboard/deals")
        page.wait_for_selector("text=Brand Deal CRM", timeout=10000)
        page.screenshot(path="verification/portal_3_deals.png", full_page=True)

        # 4. Collab Marketplace
        print("Capturing Collabs...")
        page.goto("http://localhost:3002/dashboard/collabs")
        page.wait_for_selector("text=Creator Marketplace", timeout=10000)
        page.screenshot(path="verification/portal_4_collabs.png", full_page=True)

        browser.close()
        print("All portal screenshots captured in 'verification/' folder.")

if __name__ == "__main__":
    capture_portal()
