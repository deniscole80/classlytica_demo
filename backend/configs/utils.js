const Utils = {
  status_codes: {
    successful: {
      ok: 200,
      created: 201,
      accepted: 202,
      non_authoritative_info: 203,
      no_content: 204,
      reset_content: 205,
    },
    redirection: {
      multiple_response: 300,
      moved_url_perm: 301,
      moved_url_temp: 302,
      see_other: 303,
      not_modified: 304,
      use_proxy: 305,
      unused: 306,
      temp_redirect: 307,
      perm_redirect: 308,
    },
    client_error: {
      bad_request: 400,
      unauthorized: 401,
      payment_required: 402,
      forbidden: 403,
      not_found: 404,
      method_not_allowed: 405,
      not_acceptable: 406,
      proxy_authentication: 407,
      request_timeout: 408,
      conflict: 409,
      gone: 410,
      length_required: 411,
      precondition_failed: 412,
      large_payload: 413,
      long_uri: 414,
      unsupported_media: 415,
      expected_failed: 417,
      too_many_requests: 429,
      unavailable_for_legal_reasons: 451,
    },
    server_error: {
      internal_server_error: 500,
      not_implemented: 501,
      bad_gateway: 502,
      service_unavailable: 503,
      gateway_timeout: 504,
      http_version_not_supported: 505,
      not_extended: 510,
      network_auth_required: 511,
    },
  },

  baseUrl: "http://20.74.128.128",
  tokenPassword: "@AbujaOffice123",
  resetBaseUrl: "http://20.74.128.128/#/reset-password",
  welcomeMessage: (v_code) => {
    return (
      '<div style="width: 100%; display: flex; flex-direction: column; align-items: center;">' +
      '<img src="https://classlyticadev.blob.core.windows.net/assets/app_logo_blue.png"/>' +
      '<h3 style="margin-top: 20px;">Welcome to Classlytica</h3>' +
      '<p style="margin-top: 10px;">Thank you for joining our community.</p>' +
      '<p style="margin-top: 20px;">We provide you with an outstanding social learning platform, a cloud-based school management, and a new digital learning environment.</p>' +
      '<p style="margin-top: 10px; text-align: center;"><b>' +
      v_code +
      "</b> is your verification code to complete your sign up journey with us.</p>" +
      '<p style="margin-top: 10px;">You can send us a message on any of these social media platforms. If you have any inquiries, we also share valuable information.</p>' +
      '<div style="text-align: left">' +
      "<span>Instagram - @Classlytica</span>" +
      "<span>LinkedIn - Classlytica</span>" +
      "<span>Facebook - Classlytica</span>" +
      "<span>Twitter - @Classlytica</span>" +
      '<span>WhatsApp - <span style="color: #F9CD34; font-weight: bold;">0903 256 2604</span></span>' +
      "</div>" +
      '<img src="https://classlyticadev.blob.core.windows.net/assets/signup_background.png"/>' +
      "</div>"
    );
  },
};

module.exports = Utils;
