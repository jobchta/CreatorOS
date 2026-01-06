from playwright.sync_api import sync_playwright

def verify_layout():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Mobile viewport
        context_mobile = browser.new_context(viewport={'width': 375, 'height': 667})
        page_mobile = context_mobile.new_page()

        # Desktop viewport
        context_desktop = browser.new_context(viewport={'width': 1280, 'height': 720})
        page_desktop = context_desktop.new_page()

        try:
            # 1. Verify Public Page (Mobile)
            print("Navigating to Home (Mobile)...")
            page_mobile.goto("http://localhost:3000/")
            page_mobile.wait_for_selector("nav", state="visible")

            # Check for hamburger menu
            print("Checking for hamburger menu...")
            menu_btn = page_mobile.locator("button[aria-controls='mobile-menu']")
            if menu_btn.is_visible():
                print("Hamburger menu visible.")
                menu_btn.click()
                page_mobile.wait_for_selector("#mobile-menu", state="visible")
                print("Mobile menu opened.")
                page_mobile.screenshot(path="verification/mobile_menu_open.png")
            else:
                print("Hamburger menu NOT visible.")

            # 2. Verify Dashboard (No global navbar)
            # Since dashboard requires auth or might redirect, let's just check /login layout first
            print("Navigating to Login...")
            page_desktop.goto("http://localhost:3000/login")
            page_desktop.wait_for_selector("form", state="visible")

            # Check if global navbar is ABSENT
            # The global navbar has text "LogicLoom" and links like "Pricing"
            # But specific to the public navbar is the structure.
            # Let's check for the text "Rate Calculator" which is in public navbar but shouldn't be in login
            content = page_desktop.content()
            if "Rate Calculator" not in content:
                print("Global Navbar NOT detected on Login page (Correct).")
            else:
                print("Global Navbar DETECTED on Login page (Incorrect).")

            page_desktop.screenshot(path="verification/login_page.png")

            # 3. Verify Public Layout (Desktop)
            print("Navigating to Home (Desktop)...")
            page_desktop.goto("http://localhost:3000/")
            # Check for Footer
            footer = page_desktop.locator("footer")
            if footer.is_visible():
                 print("Footer visible on Home page.")
            else:
                 print("Footer NOT visible on Home page.")

            page_desktop.screenshot(path="verification/home_desktop.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_layout()
