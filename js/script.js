new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation:
    {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
});

function removeError(field) {
    field.classList.remove('error-field');
    const errorSpan = field.nextElementSibling;
    if (errorSpan) errorSpan.textContent = '';
    const parent = field.parentNode;
    if (parent && parent.classList.contains('error')) {
        parent.classList.remove('error');
    }
}

function createError(field, message) {
    let errorSpan = field.nextElementSibling;
    if (!errorSpan) {
        errorSpan = document.createElement('span');
        errorSpan.classList.add('error-message');
        field.parentNode.appendChild(errorSpan);
    }
    errorSpan.textContent = message;
    field.classList.add('error-field');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validation(form) {
    let isValid = true;
    const allFields = form.querySelectorAll('.move__input');

    allFields.forEach(field => removeError(field));

    allFields.forEach(field => {
        if (field.classList.contains('input__email') && !isValidEmail(field.value)) {
            isValid = false;
            createError(field, "Емейл обов'язковий для заповнення");
        }
    });

    return isValid;
}

async function submitFormToWP(formData) {
    const button = document.querySelector('.submit__btn');
    button.classList.add('active');

    try {
        const response = await fetch('/wp-admin/admin-ajax.php?action=submit_to_sheets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
            button.classList.remove('active');
            button.classList.add('finished');
            const span = button.nextElementSibling;
            if (span) span.textContent = 'Невдовзі зв’яжемося з Вами!';
        } else {
            throw new Error(data.message || 'Failed to submit form');
        }
    } catch (error) {
        button.classList.remove('active');
        const span = button.nextElementSibling;
        if (span) span.textContent = 'Щось пішло не так';
    }
}

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    if (validation(this)) {
        const formData = {};
        this.querySelectorAll('.move__input').forEach(field => {
            formData[field.name] = field.value;
            field.value = '';
            removeError(field);
        });
        submitFormToWP(formData);
    }
});