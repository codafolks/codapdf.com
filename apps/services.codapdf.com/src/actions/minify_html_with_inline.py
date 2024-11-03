import htmlmin
import rjsmin
import rcssmin
import re

def minify_html_with_inline(html_content):
    # Minify inline CSS
    def minify_css(match):
        css_code = match.group(1)
        minified_css = rcssmin.cssmin(css_code)
        return f"<style>{minified_css}</style>"

    # Minify inline JavaScript
    def minify_js(match):
        js_code = match.group(1)
        minified_js = rjsmin.jsmin(js_code)
        return f"<script>{minified_js}</script>"

    # Minify CSS
    html_content = re.sub(r'<style>(.*?)</style>', minify_css, html_content, flags=re.DOTALL)
    # Minify JavaScript
    html_content = re.sub(r'<script>(.*?)</script>', minify_js, html_content, flags=re.DOTALL)

    # Minify HTML
    minified_html = htmlmin.minify(html_content, remove_comments=True, remove_empty_space=True)
    return minified_html