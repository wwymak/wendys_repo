Mydex IDP Wizard
=================

This module creates a wizard for users to setup a series of mock connections,
before being referred to the Mydex IDP server, to bounce users back to
government service IDP hub.


Usage
=================

At present, you need to switch off Mydex's default behaviour of always
directing users to their My-data page on login:

### Disable the login_destination

    drush dis login_destination --yes

### Comment out other my-data redirects

Also comment out the redirect in line 646 in `mydex_pds.module`,
to allow GET params to be preserved:

    function mydex_pds_user_login_submit($form, $form_state) {
    //  $form_state['redirect'] = 'my-data';
    }


### Add the handoff url for completeing sign in

You need to add this url to the settings.php

```php

// Add url for handing users off for IDP
$conf['mydex_idp_wizard_idp_handoff_url'] = "http://our-idp-server.mydex.org";

```