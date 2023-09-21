export type Pipeline = {
  ID: string
  ProjectID: string
  Ref: string
  Source: string
  Status: string
  WebURL: string
}

export type Project = {
  AvatarURL: string
  DefaultBranch: string
  Description: string
  HTTPURLToRepo: string
  ID: string
  Name: string
  SSHURLToRepo: string
  WebURL: string
  Owner: string
}
