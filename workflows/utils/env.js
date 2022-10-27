const dotEnv = require('dotenv');
dotEnv.config('.env');
const env = process.env || {};

module.exports = {
  /* 掘金Cookie */
  COOKIE: env.COOKIE,
  /* 多用户掘金Cookie, 当有1名以上用户时填写, 支持同时最多可配置5名用户 */
  COOKIE_2: env.COOKIE_2,
  COOKIE_3: env.COOKIE_3,
  COOKIE_4: env.COOKIE_4,
  COOKIE_5: env.COOKIE_5,
  /**
   * 邮箱配置
   * user 发件人邮箱, pass, 发件人密码, to收件人
   */
  EMAIL_USER: env.EMAIL_USER,
  EMAIL_PASS: env.EMAIL_PASS,
  EMAIL_TO: env.EMAIL_TO,
  /**
   * 钉钉配置
   * https://open.dingtalk.com/document/robots/custom-robot-access
   */
  DINGDING_WEBHOOK: env.DINGDING_WEBHOOK,
  /**
   * PushPlus配置
   * http://www.pushplus.plus/doc/guide/openApi.html
   */
  PUSHPLUS_TOKEN: env.PUSHPLUS_TOKEN,
  /**
   * 企业微信机器人配置
   * https://developer.work.weixin.qq.com/document/path/91770
   */
  WEIXIN_WEBHOOK: env.WEIXIN_WEBHOOK,

  SCTKEY: env.SCTKEY || '',
  COOL_PUSH_SKEY: env.COOL_PUSH_SKEY || '',
  COOL_PUSH_TYPE: (env.COOL_PUSH_TYPE || 'send'),
  BER_KEY: env.BER_KEY || '',
  EMAIL_ADDRESS: env.EMAIL_ADDRESS || '',
  DINGTALK_ACCESS_TOKEN: env.DINGTALK_ACCESS_TOKEN || '',
  DINGTALK_SECRET: env.DINGTALK_SECRET || '',
  WX_ROBOT_KEY: env.WX_ROBOT_KEY || '',
  WX_ROBOT_MSG_TYPE: (env.WX_ROBOT_MSG_TYPE || 'text'),
  WX_APP_CORPID: env.WX_APP_CORPID || '',
  WX_APP_AGENTID: Number(env.WX_APP_AGENTID),
  WX_APP_SECRET: env.WX_APP_SECRET || '',
  WX_APP_USERID: env.WX_APP_USERID || '',
  PUSH_PLUS_TOKEN: env.PUSH_PLUS_TOKEN || '',
  PUSH_PLUS_TEMPLATE_TYPE: (env.PUSH_PLUS_TEMPLATE_TYPE || 'html'),
  I_GOT_KEY: env.I_GOT_KEY || '',
};

