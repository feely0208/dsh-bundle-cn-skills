/**
 * @deepwhale-cn/dsh-bundle-cn-skills —— 组合包（同时也是可被识别的插件）
 *
 * ── 为什么根目录需要这一个文件 ──────────────────────────────────
 * 本仓库原本只有 cordis.patch.yml（纯组合层）：靠 insert 把 7 个技能挂进 profile。
 * 但插件市场（dsh-plugin.org）的收录要求是「**插件需导出 apply(ctx) 模块**」——
 * 纯 patch 包没有可被识别的入口，因此**一直被跳过**，详情页 404。
 *
 * 2026-10-13 诊断依据（对比已收录的同批仓库）：
 *   dsh-shell-canvas     根有 main + lib/index.js + 根 cordis.patch.yml  → 收录
 *   dsh-cn-skills        根无 main、无 lib/、patch 在子目录            → 404
 *
 * 所以这里补一个真正的 apply(ctx)：**逐个调用 7 个技能包的 apply**。
 * 效果与 patch 层等价，但多了一个可被扫描器识别的入口。
 */

export const name = 'cn-skills-bundle';
export const inject = ['skills'];

/** 组合包内含的 7 个技能包（与 package.json 的 dependencies 一致） */
const MEMBERS = [
  '@deepwhale-cn/dsh-cn-compliance',
  '@deepwhale-cn/dsh-cn-doc-formatter',
  '@deepwhale-cn/dsh-release-selfcheck',
  '@deepwhale-cn/dsh-cn-ai-labeling',
  '@deepwhale-cn/dsh-cn-pipl-check',
  '@deepwhale-cn/dsh-cn-appstore-preflight',
  '@deepwhale-cn/dsh-secret-scan',
];

export async function apply(ctx) {
  // skills 服务缺失时静默跳过：组合包是可选能力，不应阻断 profile 启动
  if (!ctx.skills || typeof ctx.skills.register !== 'function') {
    ctx.logger?.warn?.('[cn-skills-bundle] 未找到 skills 服务，跳过');
    return;
  }

  let ok = 0;
  for (const spec of MEMBERS) {
    try {
      const mod = await import(spec);
      if (typeof mod.apply === 'function') {
        mod.apply(ctx);
        ok++;
      } else {
        ctx.logger?.warn?.(`[cn-skills-bundle] ${spec} 没有导出 apply，跳过`);
      }
    } catch (e) {
      // 单个成员失败不影响其它成员 —— 组合包的健壮性要求
      ctx.logger?.error?.(`[cn-skills-bundle] 加载 ${spec} 失败：${e}`);
    }
  }
  ctx.logger?.info?.(`[cn-skills-bundle] 已挂载 ${ok}/${MEMBERS.length} 个技能`);
}
