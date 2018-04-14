package OpenSourceProjects_Storybook.buildTypes

import jetbrains.buildServer.configs.kotlin.v2017_2.*
import jetbrains.buildServer.configs.kotlin.v2017_2.buildFeatures.commitStatusPublisher
import jetbrains.buildServer.configs.kotlin.v2017_2.buildSteps.script
import jetbrains.buildServer.configs.kotlin.v2017_2.triggers.vcs

object OpenSourceProjects_Storybook_Danger : BuildType({
    uuid = "759f0116-2f7d-4c03-8220-56e4ab03be3a"
    id = "OpenSourceProjects_Storybook_Danger"
    name = "Danger"

    params {
        param("env.DANGER_GITHUB_API_TOKEN", "49aa9a6549007391dfcef9c76fca32a73560fd83")
        param("env.PULL_REQUEST_URL", "%vcsroot.url%/%teamcity.build.branch%")
    }

    vcs {
        root(OpenSourceProjects_Storybook.vcsRoots.OpenSourceProjects_Storybook_HttpsGithubComStorybooksStorybookRefsHeadsMaster1)

        buildDefaultBranch = false
    }

    steps {
        script {
            name = "Install"
            scriptContent = "yarn"
            dockerImage = "node:latest"
        }
        script {
            name = "Danger"
            scriptContent = "yarn danger ci"
            dockerImage = "node:latest"
        }
    }

    triggers {
        vcs {
            branchFilter = """
                +:*
                -:master
            """.trimIndent()
        }
    }

    features {
        commitStatusPublisher {
            publisher = github {
                githubUrl = "https://api.github.com"
                authType = personalToken {
                    token = "credentialsJSON:5ffe2d7e-531e-4f6f-b1fc-a41bfea26eaa"
                }
            }
            param("github_oauth_user", "Hypnosphi")
        }
    }

    requirements {
        doesNotContain("env.OS", "Windows")
    }

    cleanup {
        artifacts(days = 1)
    }
})
