from flask import current_app as app
from flask import redirect, render_template, url_for
from .forms import ContactForm

customer_name = ""

@app.route("/")
def home():
    return render_template(
        'index.jinja2', 
        title='BarberShop Website Design'
        )

@app.route("/contact", methods=["GET", "POST"])
def contact():
    """User sign-up form for account creation."""
    form = ContactForm()
    if form.validate_on_submit():
        customer_name = form["name"].data
        return redirect(url_for("success"))
    return render_template(
        "form.jinja2",
        form=form,
        title="Contact Form"
    )

@app.route("/success", methods=["GET", "POST"])
def success():
    return render_template(
        "success.jinja2",
        title="Success",
        name = customer_name
    )