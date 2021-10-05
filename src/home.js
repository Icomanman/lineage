document.onreadystatechange = () => {
    if (document.readyState === 'interactive') {
        // jQuery bindings:
        jQuery(document).bind('contextmenu', evt => false);
        jQuery('#settings').bind('click', () => {
            jQuery('.ui.sidebar').sidebar('toggle');
            // TODO: fix dimmer
            // if (jQuery('body').hasClass('pushable')) jQuery('body').removeClass('pushable');
        });
        jQuery('#gender-dropdown').dropdown();
        jQuery('#gen-dropdown').dropdown();
        jQuery('#person-btn').bind('click', () => {
            jQuery('#person-modal').modal('toggle');
        });
        jQuery('#family-btn').bind('click', () => {
            jQuery('#family-modal').modal('toggle');
        });

        const person = {
            firstname: {
                identifier: 'first',
                rules: [{ type: 'regExp[/^[A-Za-z ]+$/]', prompt: 'First Name should be letters only' }]
            },
            lastname: {
                identifier: 'last',
                rules: [{ type: "regExp[/^[A-Za-z ]+$/]", prompt: 'Last Name should be letters only' }]
            },
            date: {
                identifier: 'day',
                rules: [{ type: 'empty', prompt: 'Please enter date of birth' }]
            },
            gender: {
                identifier: 'gender',
                rules: [{ type: 'empty', prompt: 'Please enter gender' }]
            },
            generation: {
                identifier: 'gen',
                rules: [{ type: 'empty', prompt: 'Generation should not be empty' }]
            }
        };
        const family = {
            name: {
                identifier: 'name',
                rules: [{ type: 'regExp[/^[A-Za-z ]+$/]', prompt: 'Family Name should be letters only' }]
            },
            head: {
                identifier: 'head',
                rules: [{ type: "regExp[/^[A-Za-z ]+$/]", prompt: 'Head Name should be letters only' }]
            }
        };

        function formValidations(form_id, form_fields) {
            jQuery(`#${form_id}-form`).form({
                on: 'submit',
                fields: form_fields,
                onFailure: () => false,
                onSuccess: () => {
                    setTimeout(() => {
                        jQuery('.success.message').transition('fade right');
                        jQuery(`#${form_id}-form`).form('clear');
                        // redirect to home:
                        // setTimeout(() => {
                        //     window.location.href = '/home';
                        // }, 750);
                    }, 1000);
                    return false;
                }
            });
        }

        jQuery('#family-form [type="submit"]').bind('click', () => {
            const form_dat = [];
            jQuery('#family-form input').each(
                function () {
                    form_dat.push(jQuery(this).val());
                });
            console.log(form_dat);
            debugger;
            // cl.dbRequest(form_dat, 'head');
        });

        formValidations('person', person);
        formValidations('family', family);
    }
};