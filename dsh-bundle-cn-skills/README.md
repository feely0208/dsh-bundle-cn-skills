# @deepwhale-cn/dsh-bundle-cn-skills

**中国大陆合规工具箱 —— 一条命令装上全部 7 个技能。**

这是 [dsh-cn-skills](https://github.com/feely0208/dsh-cn-skills) 的组合包（bundle）。
组合包本身不含逻辑，只声明依赖，并把 7 个技能插件一次性挂进 DSH profile。

## 安装

```bash
dsh plugin add @deepwhale-cn/dsh-bundle-cn-skills
```

装完重启 DSH，Agent 在相关对话里会自动带上这 7 个技能。

## 包含什么

| 技能 | 管什么 |
|---|---|
| `dsh-cn-compliance` | **话能不能说** —— 对外内容合规红线：网络工具用语、广告法极限词、绝对化承诺、内部文件公网暴露 |
| `dsh-cn-doc-formatter` | **公文怎么排** —— 按 GB/T 9704-2012 生成 `.docx` / `.pdf` / `.txt` |
| `dsh-release-selfcheck` | **东西对不对** —— 发布前自检：产物清单比对、版本一致性、架构正确性、上线前逐链接检查 |
| `dsh-cn-ai-labeling` | **AI 标识做没做** —— 对照《人工智能生成合成内容标识办法》与 GB 45438—2025 |
| `dsh-cn-pipl-check` | **说的和做的是否一致** —— 个人信息保护：权限最小必要、第三方 SDK、用户权利入口 |
| `dsh-cn-appstore-preflight` | **上架能不能过** —— App 备案、隐私政策可达性、权限场景说明、账号注销入口 |
| `dsh-secret-scan` | **有没有把密钥交出去** —— AK / 令牌 / 私钥 / 凭据文件是否被 git 跟踪 |

## 权限与外部服务

**全部只读本机文件做静态检查：不联网、不上传、不写入你的项目。**

刻意不内置敏感词表 —— 避免本工具成为「绕过合规检查」的工具，只做机械可查的部分。

## 只装单个技能

不需要全套的话，直接装其中某个包即可：

```bash
dsh plugin add @deepwhale-cn/dsh-cn-compliance
```

各包详情见主仓库 [dsh-cn-skills](https://github.com/feely0208/dsh-cn-skills)。

## License

[MIT](./LICENSE) · 由 [深鲸 DeepWhale](https://deepwhale.org.cn) 维护
