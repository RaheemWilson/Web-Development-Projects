from flask_wtf import FlaskForm

from wtforms import (
    StringField,
    SubmitField,
    TextAreaField,
)
from wtforms.validators import DataRequired, Email

class ContactForm(FlaskForm):
    """Contact form"""

    name = StringField(
        "Name",
        [DataRequired()]
    )
    email = StringField(
        "Email",
        [DataRequired()]
    )

    comment = TextAreaField(
        "Leave a comment",
        [DataRequired()]
    )
    
    
    submit = SubmitField("Submit")