
const cl = (function () {
    const f = {};
    const g = {};
    return { f, g }
})();

// Index Page. Alternative to DOMContentLoaded event
document.onreadystatechange = () => {
    if (document.readyState === 'interactive') {
        const _validate = route => {
            const login_fields = {
                email: {
                    identifier: 'email',
                    rules: [{ type: 'email', prompt: 'Please enter a valid email' }]
                },
                password: {
                    identifier: 'peewee',
                    rules: [
                        { type: 'empty', prompt: 'Please enter your password' },
                        { type: 'minLength[8]', prompt: 'Your password should be at least 8 characters' }
                    ]
                }
            };
            const reg_fields = {
                firstname: {
                    identifier: 'first',
                    rules: [{ type: 'regExp[/^[A-Za-z ]+$/]', prompt: 'First Name should be letters only' }]
                },
                lastname: {
                    identifier: 'last',
                    rules: [{ type: "regExp[/^[A-Za-z ]+$/]", prompt: 'Last Name should be letters only' }]
                },
                email: {
                    identifier: 'email',
                    rules: [{ type: 'email', prompt: 'Please enter a valid email' }]
                },
                password: {
                    identifier: 'peewee',
                    rules: [{ type: 'empty', prompt: 'Please enter your password' }]
                },
                date: {
                    identifier: 'day',
                    rules: [{ type: 'empty', prompt: 'Please enter your date of birth' }]
                },
                gender: {
                    identifier: 'gender',
                    rules: [{ type: 'empty', prompt: 'Please enter your gender' }]
                }
            };
            const fields = route === 'login' ? login_fields : reg_fields;
            jQuery('.ui.form').form({
                on: 'blur',
                fields,
                onFailure: () => false,
                onSuccess: () => true
            });
            // jQuery('form').form('clear');
        };

        if (document.URL.match('/login')) _validate('login');
        else if (document.URL.match('/')) {
            jQuery('.ui.checkbox').checkbox();
            _validate('registration');
        }
    }
};
