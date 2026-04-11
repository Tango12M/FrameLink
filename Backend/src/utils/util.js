export function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`;
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} months ago`;
  return `${Math.floor(seconds / 31536000)} years ago`;
}

export function generateVerificationCode(length = 4) {
  return Math.floor(10 ** (length - 1) + Math.random() * 9 * 10 ** (length - 1)).toString();
}

export function emailHTML(username, verificationCode) {
  return `
  <div style="font-family: Arial, sans-serif; background:#f6f6f6; padding:40px 0;">
    <div style="max-width:500px; margin:auto; background:#ffffff; border-radius:12px; padding:30px; text-align:center; box-shadow:0 4px 20px rgba(0,0,0,0.05);">

      <img src="https://ik.imagekit.io/h9m1sz0rc/FrameLink/img/framelink-logo.svg?updatedAt=1775904687601" 
           alt="FrameLink Logo" 
           width="120" 
           style="margin-bottom:20px; border-radius: 100%" />

      <h2 style="color:#111; margin-bottom:10px;">Welcome to FrameLink 🚀</h2>

      <p style="color:#555; font-size:14px;">
        Hi <strong>${username}</strong>,
      </p>

      <p style="color:#555; font-size:14px; line-height:1.6;">
        Your verification code is:
      </p>

      <p style="font-size:28px; font-weight:700; letter-spacing:6px; margin:18px 0; color:#111;">
        ${verificationCode}
      </p>

      <p style="color:#555; font-size:14px; line-height:1.6;">
        Enter this code in the app to verify your email. It expires in 10 minutes.
      </p>

      <p style="color:#999; font-size:12px; margin-top:24px;">
        If you didn't create this account, you can safely ignore this email.
      </p>

      <hr style="margin:20px 0; border:none; border-top:1px solid #eee;" />

      <p style="font-size:12px; color:#aaa;">
        © FrameLink • Where everything connects
      </p>

    </div>
  </div>
`;
}

export const formatSize = (bytes) => (bytes / (1024 * 1024)).toFixed(0);
