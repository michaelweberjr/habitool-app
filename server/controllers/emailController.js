const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY =
  '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';
sgMail.setApiKey(SENDGRID_API_KEY);

const emailController = {};

emailController.sendSignupEmail = (req, res, next) => {
  const { email, name } = req.body;
  console.log(`about to send an email to ${email}`);

  const signupEmail = signupEmailTemplate(name);

  const msg = {
    to: email, // recipient
    from: 'habittool@gmail.com', // verified sender
    subject: `Welcome to Habitool! ${name}`,
    text: 'Habitool wadbabfgiawbg', // ? is this field necessary?
    html: signupEmail,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
      return next();
    })
    .catch((error) => {
      console.error(error);
      return next({ err: 'error sending signup email to: ' + error });
    });
};

function signupEmailTemplate(name) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html
    data-editor-version="2"
    class="sg-campaigns"
    xmlns="http://www.w3.org/1999/xhtml"
  >
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
      />
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
      <!--<![endif]-->
      <!--[if (gte mso 9)|(IE)]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG />
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      <![endif]-->
      <!--[if (gte mso 9)|(IE)]>
        <style type="text/css">
          body {
            width: 600px;
            margin: 0 auto;
          }
          table {
            border-collapse: collapse;
          }
          table,
          td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
          img {
            -ms-interpolation-mode: bicubic;
          }
        </style>
      <![endif]-->
      <style type="text/css">
        body,
        p,
        div {
          font-family: arial, helvetica, sans-serif;
          font-size: 14px;
        }
        body {
          color: #000000;
        }
        body a {
          color: #1188e6;
          text-decoration: none;
        }
        p {
          margin: 0;
          padding: 0;
        }
        table.wrapper {
          width: 100% !important;
          table-layout: fixed;
          -webkit-font-smoothing: antialiased;
          -webkit-text-size-adjust: 100%;
          -moz-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        img.max-width {
          max-width: 100% !important;
        }
        .column.of-2 {
          width: 50%;
        }
        .column.of-3 {
          width: 33.333%;
        }
        .column.of-4 {
          width: 25%;
        }
        ul ul ul ul {
          list-style-type: disc !important;
        }
        ol ol {
          list-style-type: lower-roman !important;
        }
        ol ol ol {
          list-style-type: lower-latin !important;
        }
        ol ol ol ol {
          list-style-type: decimal !important;
        }
        @media screen and (max-width: 480px) {
          .preheader .rightColumnContent,
          .footer .rightColumnContent {
            text-align: left !important;
          }
          .preheader .rightColumnContent div,
          .preheader .rightColumnContent span,
          .footer .rightColumnContent div,
          .footer .rightColumnContent span {
            text-align: left !important;
          }
          .preheader .rightColumnContent,
          .preheader .leftColumnContent {
            font-size: 80% !important;
            padding: 5px 0;
          }
          table.wrapper-mobile {
            width: 100% !important;
            table-layout: fixed;
          }
          img.max-width {
            height: auto !important;
            max-width: 100% !important;
          }
          a.bulletproof-button {
            display: block !important;
            width: auto !important;
            font-size: 80%;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .columns {
            width: 100% !important;
          }
          .column {
            display: block !important;
            width: 100% !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          .social-icon-column {
            display: inline-block !important;
          }
        }
      </style>
      <!--user entered Head Start-->
      <!--End Head user entered-->
    </head>
    <body>
      <center
        class="wrapper"
        data-link-color="#1188E6"
        data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;"
      >
        <div class="webkit">
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="100%"
            class="wrapper"
            bgcolor="#FFFFFF"
          >
            <tr>
              <td valign="top" bgcolor="#FFFFFF" width="100%">
                <table
                  width="100%"
                  role="content-container"
                  class="outer"
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                >
                  <tr>
                    <td width="100%">
                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                      >
                        <tr>
                          <td>
                            <!--[if mso]>
      <center>
      <table><tr><td width="600">
    <![endif]-->
                            <table
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              style="width: 100%; max-width: 600px"
                              align="center"
                            >
                              <tr>
                                <td
                                  role="modules-container"
                                  style="
                                    padding: 0px 0px 0px 0px;
                                    color: #000000;
                                    text-align: left;
                                  "
                                  bgcolor="#FFFFFF"
                                  width="100%"
                                  align="left"
                                >
                                  <table
                                    class="module preheader preheader-hide"
                                    role="module"
                                    data-type="preheader"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="
                                      display: none !important;
                                      mso-hide: all;
                                      visibility: hidden;
                                      opacity: 0;
                                      color: transparent;
                                      height: 0;
                                      width: 0;
                                    "
                                  >
                                    <tr>
                                      <td role="module-content">
                                        <p></p>
                                      </td>
                                    </tr>
                                  </table>
                                  <table
                                    class="module"
                                    role="module"
                                    data-type="text"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="table-layout: fixed"
                                    data-muid="0de8b65c-e81a-4eb4-81db-ef27c28780e5"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style="
                                            padding: 18px 0px 18px 0px;
                                            line-height: 22px;
                                            text-align: inherit;
                                          "
                                          height="100%"
                                          valign="top"
                                          bgcolor=""
                                          role="module-content"
                                        >
                                          <div>
                                            <div
                                              style="
                                                font-family: inherit;
                                                text-align: left;
                                              "
                                            >
                                              <span style="font-size: 24px"
                                                ><strong
                                                  >Welcome to HabitTool, ${name}</strong
                                                ></span
                                              >
                                            </div>
                                            <div
                                              style="
                                                font-family: inherit;
                                                text-align: left;
                                              "
                                            >
                                              <br />
                                            </div>
                                            <div
                                              style="
                                                font-family: inherit;
                                                text-align: left;
                                              "
                                            >
                                              <br />
                                            </div>
                                            <div style="font-family: inherit">
                                              <span
                                                style="
                                                  color: #222222;
                                                  font-style: normal;
                                                  font-variant-ligatures: normal;
                                                  font-variant-caps: normal;
                                                  font-weight: 400;
                                                  letter-spacing: normal;
                                                  orphans: 2;
                                                  text-align: start;
                                                  text-indent: 0px;
                                                  text-transform: none;
                                                  white-space: normal;
                                                  widows: 2;
                                                  word-spacing: 0px;
                                                  -webkit-text-stroke-width: 0px;
                                                  background-color: rgb(
                                                    255,
                                                    255,
                                                    255
                                                  );
                                                  text-decoration-thickness: initial;
                                                  text-decoration-style: initial;
                                                  text-decoration-color: initial;
                                                  float: none;
                                                  display: inline;
                                                  font-family: arial, helvetica,
                                                    sans-serif;
                                                  font-size: 14px;
                                                "
                                                >Thank you for joining the
                                                HabiTool community, where tens of
                                                people are making healthy
                                                aspirations a reality.</span
                                              ><span
                                                style="
                                                  font-family: arial, helvetica,
                                                    sans-serif;
                                                  font-size: 14px;
                                                "
                                                >&nbsp;</span
                                              >
                                            </div>
                                            <div style="font-family: inherit">
                                              <br />
                                            </div>
                                            <div style="font-family: inherit">
                                              <br />
                                            </div>
                                            <div style="font-family: inherit">
                                              <br />
                                            </div>
                                            <div style="font-family: inherit">
                                              <span
                                                style="
                                                  font-family: arial, helvetica,
                                                    sans-serif;
                                                  font-size: 14px;
                                                "
                                                >To get started, create a habit
                                                you wish to track:</span
                                              >
                                            </div>
                                            <div></div>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="module"
                                    data-role="module-button"
                                    data-type="button"
                                    role="module"
                                    style="table-layout: fixed"
                                    width="100%"
                                    data-muid="be84d571-9b98-42c0-9c15-2c475938c017"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          align="center"
                                          bgcolor=""
                                          class="outer-td"
                                          style="padding: 0px 0px 0px 0px"
                                        >
                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            class="wrapper-mobile"
                                            style="text-align: center"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  align="center"
                                                  bgcolor="#2e9bf2"
                                                  class="inner-td"
                                                  style="
                                                    border-radius: 6px;
                                                    font-size: 16px;
                                                    text-align: center;
                                                    background-color: inherit;
                                                  "
                                                >
                                                  <a
                                                    href="http://localhost:3000/dashboard"
                                                    style="
                                                      background-color: #2e9bf2;
                                                      border: 0px solid #333333;
                                                      border-color: #333333;
                                                      border-radius: 6px;
                                                      border-width: 0px;
                                                      color: #ffffff;
                                                      display: inline-block;
                                                      font-size: 14px;
                                                      font-weight: normal;
                                                      letter-spacing: 0px;
                                                      line-height: normal;
                                                      padding: 12px 18px 12px 18px;
                                                      text-align: center;
                                                      text-decoration: none;
                                                      border-style: solid;
                                                    "
                                                    target="_blank"
                                                    >CREATE HABIT</a
                                                  >
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table
                                    class="module"
                                    role="module"
                                    data-type="spacer"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="table-layout: fixed"
                                    data-muid="84882de9-b4d3-41bd-b5b7-f79299bb958f"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style="padding: 0px 0px 60px 0px"
                                          role="module-content"
                                          bgcolor=""
                                        ></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table
                                    class="wrapper"
                                    role="module"
                                    data-type="image"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="table-layout: fixed"
                                    data-muid="f931a0ca-09d9-48c1-9a73-46d3da7a6465"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style="
                                            font-size: 6px;
                                            line-height: 10px;
                                            padding: 0px 0px 0px 0px;
                                          "
                                          valign="top"
                                          align="center"
                                        >
                                          <img
                                            class="max-width"
                                            border="0"
                                            style="
                                              display: block;
                                              color: #000000;
                                              text-decoration: none;
                                              font-family: Helvetica, arial,
                                                sans-serif;
                                              font-size: 16px;
                                              max-width: 100% !important;
                                              width: 100%;
                                              height: auto !important;
                                            "
                                            width="600"
                                            alt=""
                                            data-proportionally-constrained="true"
                                            data-responsive="true"
                                            src="http://cdn.mcauto-images-production.sendgrid.net/d32bcc04af917745/24cc4d59-8bf5-4cf4-bb8f-c0aa49301f31/2121x1193.jpg"
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table
                                    class="module"
                                    role="module"
                                    data-type="spacer"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="table-layout: fixed"
                                    data-muid="7ab7dcad-5843-4a02-97b2-a7251767aff7"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style="padding: 0px 0px 30px 0px"
                                          role="module-content"
                                          bgcolor=""
                                        ></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    align="center"
                                    width="100%"
                                    role="module"
                                    data-type="columns"
                                    style="padding: 0px 0px 0px 0px"
                                    bgcolor="#FFFFFF"
                                    data-distribution="1,1"
                                  >
                                    <tbody>
                                      <tr role="module-content">
                                        <td height="100%" valign="top">
                                          <table
                                            width="290"
                                            style="
                                              width: 290px;
                                              border-spacing: 0;
                                              border-collapse: collapse;
                                              margin: 0px 10px 0px 0px;
                                            "
                                            cellpadding="0"
                                            cellspacing="0"
                                            align="left"
                                            border="0"
                                            bgcolor=""
                                            class="column column-0"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="
                                                    padding: 0px;
                                                    margin: 0px;
                                                    border-spacing: 0;
                                                  "
                                                >
                                                  <table
                                                    class="wrapper"
                                                    role="module"
                                                    data-type="image"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    width="100%"
                                                    style="table-layout: fixed"
                                                    data-muid="i4AaR6qjEYwm983APPyVUr"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style="
                                                            font-size: 6px;
                                                            line-height: 10px;
                                                            padding: 0px 0px 0px
                                                              0px;
                                                          "
                                                          valign="top"
                                                          align="center"
                                                        >
                                                          <img
                                                            class="max-width"
                                                            border="0"
                                                            style="
                                                              display: block;
                                                              color: #000000;
                                                              text-decoration: none;
                                                              font-family: Helvetica,
                                                                arial, sans-serif;
                                                              font-size: 16px;
                                                              max-width: 100% !important;
                                                              width: 100%;
                                                              height: auto !important;
                                                            "
                                                            width="290"
                                                            alt=""
                                                            data-proportionally-constrained="true"
                                                            data-responsive="true"
                                                            src="http://cdn.mcauto-images-production.sendgrid.net/d32bcc04af917745/7dff4888-9520-4f01-9029-06bc43f61322/869x664.png"
                                                          />
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <table
                                            width="290"
                                            style="
                                              width: 290px;
                                              border-spacing: 0;
                                              border-collapse: collapse;
                                              margin: 0px 0px 0px 10px;
                                            "
                                            cellpadding="0"
                                            cellspacing="0"
                                            align="left"
                                            border="0"
                                            bgcolor=""
                                            class="column column-1"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="
                                                    padding: 0px;
                                                    margin: 0px;
                                                    border-spacing: 0;
                                                  "
                                                >
                                                  <table
                                                    class="module"
                                                    role="module"
                                                    data-type="spacer"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    width="100%"
                                                    style="table-layout: fixed"
                                                    data-muid="a919be4e-e28e-4d4b-be20-9e68a9926e2c"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style="
                                                            padding: 0px 0px 120px
                                                              0px;
                                                          "
                                                          role="module-content"
                                                          bgcolor=""
                                                        ></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  <table
                                                    class="module"
                                                    role="module"
                                                    data-type="text"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    width="100%"
                                                    style="table-layout: fixed"
                                                    data-muid="uuctdwwzNVfkgxdzPsQDeM"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style="
                                                            padding: 18px 0px 18px
                                                              0px;
                                                            line-height: 22px;
                                                            text-align: inherit;
                                                          "
                                                          height="100%"
                                                          valign="top"
                                                          bgcolor=""
                                                          role="module-content"
                                                        >
                                                          <div>
                                                            <div
                                                              style="
                                                                font-family: inherit;
                                                              "
                                                            >
                                                              <span
                                                                style="
                                                                  color: #294661;
                                                                  font-family: 'Open Sans',
                                                                    'Helvetica Neue',
                                                                    Helvetica,
                                                                    Helvetica,
                                                                    Arial,
                                                                    sans-serif;
                                                                  font-size: 12px;
                                                                  font-style: normal;
                                                                  font-variant-ligatures: normal;
                                                                  font-variant-caps: normal;
                                                                  font-weight: 300;
                                                                  letter-spacing: normal;
                                                                  orphans: 2;
                                                                  text-align: center;
                                                                  text-indent: 0px;
                                                                  text-transform: none;
                                                                  white-space: normal;
                                                                  widows: 2;
                                                                  word-spacing: 0px;
                                                                  -webkit-text-stroke-width: 0px;
                                                                  background-color: rgb(
                                                                    253,
                                                                    253,
                                                                    253
                                                                  );
                                                                  text-decoration-thickness: initial;
                                                                  text-decoration-style: initial;
                                                                  text-decoration-color: initial;
                                                                  float: none;
                                                                  display: inline;
                                                                "
                                                                >© HabitTool Inc.
                                                                420 Everywhere
                                                                Street, Suite 5
                                                                million, New York,
                                                                NY 69420 USA</span
                                                              >&nbsp;
                                                            </div>
                                                            <div></div>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <div
                                    data-role="module-unsubscribe"
                                    class="module"
                                    role="module"
                                    data-type="unsubscribe"
                                    style="
                                      color: #444444;
                                      font-size: 12px;
                                      line-height: 20px;
                                      padding: 16px 16px 16px 16px;
                                      text-align: Center;
                                    "
                                    data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"
                                  >
                                    <div class="Unsubscribe--addressLine"></div>
                                    <p style="font-size: 12px; line-height: 20px">
                                      <a
                                        target="_blank"
                                        class="
                                          Unsubscribe--unsubscribeLink
                                          zzzzzzz
                                        "
                                        href="{{{unsubscribe}}}"
                                        style=""
                                        >Unsubscribe</a
                                      >
                                      -
                                      <a
                                        href="{{{unsubscribe_preferences}}}"
                                        target="_blank"
                                        class="
                                          Unsubscribe--unsubscribePreferences
                                        "
                                        style=""
                                        >Unsubscribe Preferences</a
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <!--[if mso]>
                                    </td>
                                  </tr>
                                </table>
                              </center>
                              <![endif]-->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </center>
    </body>
  </html>`;
}

module.exports = emailController;
