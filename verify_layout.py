from playwright.sync_api import sync_playwright

def verify_layouts():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Check Landing Page (Public)
        print("Checking Public Landing Page...")
        page.goto("http://localhost:3002/")
        page.wait_for_selector("h1")

        # Check for Public Navbar
        navbar = page.locator("nav").first
        if navbar.is_visible() and "LogicLoom" in page.content():
            print("SUCCESS: Public Navbar found on Landing Page.")
        else:
            print("FAILURE: Public Navbar NOT found on Landing Page.")

        page.screenshot(path="verification/landing_page_layout.png")
        print("Screenshot saved to verification/landing_page_layout.png")

        # Check Dashboard (Private)
        print("Checking Dashboard...")
        page.goto("http://localhost:3002/dashboard")
        page.wait_for_selector("text=Overview") # Sidebar item

        # Check that Public Navbar is NOT present
        # The public navbar usually has specific text links like "Rate Calculator" or specific class
        # Let's check for "Rate Calculator" link in the header area, which shouldn't be there.
        # Or check if the top-level nav is the Sidebar/Header of dashboard.

        # The public navbar has links like "Rate Calculator", "Pricing"
        public_nav_link = page.get_by_text("Rate Calculator")

        if public_nav_link.count() == 0 or not public_nav_link.is_visible():
             print("SUCCESS: Public Navbar NOT found on Dashboard.")
        else:
             print("FAILURE: Public Navbar FOUND on Dashboard (Double Header Issue).")

        # Take screenshot of Dashboard to confirm
        page.screenshot(path="verification/dashboard_layout_fixed.png")
        print("Screenshot saved to verification/dashboard_layout_fixed.png")

        browser.close()

if __name__ == "__main__":
    verify_layouts()
