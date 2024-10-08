const { ServerChanTurbo, CoolPush, Dingtalk, Email, WechatRobot, WechatApp, PushPlus, IGot } = require('push-all-in-one')
const {
    SCTKEY, COOL_PUSH_SKEY, COOL_PUSH_TYPE, BER_KEY, EMAIL_ADDRESS, DINGTALK_ACCESS_TOKEN, DINGTALK_SECRET,
    WX_ROBOT_KEY, WX_APP_CORPID, WX_APP_AGENTID, WX_APP_SECRET, WX_APP_USERID, PUSH_PLUS_TOKEN, I_GOT_KEY, PUSH_PLUS_TEMPLATE_TYPE,
    WX_ROBOT_MSG_TYPE,
} = require('./env');

function info(text) {
    console.info(text);
}
function warn(text) {
    console.warn(text);
}

/**
 * 
 * @param {string} title 
 * @param {string} desp 
 * @returns 
 */
module.exports = async function runPushAllInOne(title, desp) {
    const pushs = []
    if (SCTKEY) {
        // Server酱。官方文档：https://sct.ftqq.com/
        const serverChanTurbo = new ServerChanTurbo(SCTKEY)
        pushs.push(serverChanTurbo.send(title, desp))
        info('Server酱·Turbo 已加入推送队列')
    } else {
        info('未配置 Server酱·Turbo，已跳过')
    }

    if (COOL_PUSH_SKEY) {
        // 酷推。官方文档：https://cp.xuthus.cc/
        const coolPush = new CoolPush(COOL_PUSH_SKEY)
        pushs.push(coolPush.send(`${title}\n${desp}`, COOL_PUSH_TYPE))
        info('Cool Push 已加入推送队列')
    } else {
        info('未配置 Cool Push，已跳过')
    }

    if (EMAIL_ADDRESS) {
        // BER分邮件系统。官方文档：http://doc.berfen.com/1239397
        // 如果不提供 BER_KEY 将会使用免费版本进行推送。免费接口有较多限制，请自行斟酌
        const email = new Email(BER_KEY)
        pushs.push(email.send({
            title,
            // subtitle: '这是个小标题',
            desp,
            address: EMAIL_ADDRESS,
        }))
        info('BER分邮件系统 已加入推送队列')
    } else {
        info('未配置 BER分邮件系统，已跳过')
    }

    if (DINGTALK_ACCESS_TOKEN) {
        // 钉钉机器人。官方文档：https://developers.dingtalk.com/document/app/custom-robot-access
        const dingtalk = new Dingtalk(DINGTALK_ACCESS_TOKEN, DINGTALK_SECRET)
        pushs.push(dingtalk.send(title, desp))
        info('钉钉机器人 已加入推送队列')
    } else {
        info('未配置 钉钉机器人，已跳过')
    }

    if (WX_ROBOT_KEY) {
        // 企业微信群机器人。官方文档：https://work.weixin.qq.com/help?person_id=1&doc_id=13376
        // 企业微信群机器人的使用需要两人以上加入企业，如果个人使用微信推送建议使用 企业微信应用+微信插件 推送
        const wechatRobot = new WechatRobot(WX_ROBOT_KEY)
        pushs.push(wechatRobot.send(`${title}\n${desp}`, WX_ROBOT_MSG_TYPE))
        info('企业微信群机器人 已加入推送队列')
    } else {
        info('未配置 企业微信群机器人，已跳过')
    }

    if (WX_APP_CORPID && WX_APP_AGENTID && WX_APP_SECRET) {
        // 企业微信应用推送，官方文档：https://work.weixin.qq.com/api/doc/90000/90135/90664
        const wechatApp = new WechatApp({
            WX_APP_CORPID,
            WX_APP_AGENTID,
            WX_APP_SECRET,
            WX_APP_USERID,
        })
        pushs.push(wechatApp.send(`${title}\n${desp}`))
        info('企业微信应用推送 已加入推送队列')
    } else {
        info('未配置 企业微信应用推送，已跳过')
    }

    if (PUSH_PLUS_TOKEN) {
        // pushplus 推送，官方文档：http://pushplus.hxtrip.com/doc/
        const pushplus = new PushPlus(PUSH_PLUS_TOKEN)
        pushs.push(pushplus.send(title, desp, PUSH_PLUS_TEMPLATE_TYPE))
        info('pushplus推送 已加入推送队列')
    } else {
        info('未配置 pushplus推送，已跳过')
    }

    if (I_GOT_KEY) {
        // iGot 推送，官方文档：https://wahao.github.io/Bark-MP-helper
        const iGot = new IGot(I_GOT_KEY)
        pushs.push(iGot.send(title, desp))
        info('iGot推送 已加入推送队列')
    } else {
        info('未配置 iGot推送，已跳过')
    }

    if (pushs.length === 0) {
        warn('未配置任何推送，请检查推送配置的环境变量！')
        return []
    }

    const results = await Promise.allSettled(pushs)
    const success = results.filter((e) => e.status === 'fulfilled')
    const fail = results.filter((e) => e.status === 'rejected')

    info(`本次共推送 ${results.length} 个，成功 ${success.length} 个，失败 ${fail.length} 个`)

    return results
}