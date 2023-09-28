package runner

type Job struct {
  Stage string `json:"Stage"`
  Scripts []string `json:"Scripts"`
  Only []string `json:"Only"`
  Tags []string `json:"Tags"`
}

func (job *Job) NewJob() *Job {
  var out = &Job{}
  return out
}

type CI struct {
	Version string `json:"Version"`
  Before_scripts []string `json:"Before_script"`
  After_scripts []string `json:"After_script"`
  // string array for the jobs
  Stages []string  `json:"Stages"`
  Jobs []*Job `json:"Jobs"`
}

func (ci *CI) NewCI() *CI {
  var out = &CI{}
  return out
}
