import re


def check_fields_not_empty_signin(email, password):
    if not all([email, password]):
        empty_fields = [field for field, value in {
            'Email': email,
            'Password': password,
        }.items() if not value]
        return f"The following fields are empty: {', '.join(empty_fields)}"
    else:
        return True


def check_fields_not_empty_signup(email, password, firstname, lastname, birthday):
    if not all([email, password, firstname, lastname, birthday]):
        empty_fields = [field for field, value in {
            'Email': email,
            'Password': password,
            'First Name': firstname,
            'Last Name': lastname,
            'Birthday': birthday
        }.items() if not value]
        return f"The following fields are empty: {', '.join(empty_fields)}"
    else:
        return True


def is_valid_email(email):
    pattern = r'^\S+@\S+\.\S+$'
    if re.match(pattern, email):
        return True
    else:
        return False
