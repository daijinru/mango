package utils

import (
	docker "github.com/fsouza/go-dockerclient"
)

type Docker struct {
	Client *docker.Client `json:"client"`
}

func (c *Docker) NewClient() *Docker {
	client, err := docker.NewClientFromEnv()
  ReportErr(err)
  c.Client = client
  return c
}

type Images struct {
  Size int `json:"size"`
  List []*docker.APIImages `json:"List"`
}

func (c *Docker) ListImages() *Images {
	var out = &Images{}
	imgs, err := c.Client.ListImages(docker.ListImagesOptions{All: false})
	ReportErr(err)
	for _, img := range imgs {
		var unit = &docker.APIImages{
			ID:          img.ID,
			RepoTags:    img.RepoTags,
			Size:        img.Size,
			RepoDigests: img.RepoDigests,
			ParentID:    img.ParentID,
			Labels:      img.Labels,
			Created:     img.Created,
		}
		out.List = append(out.List, unit)
	}
	out.Size = len(out.List)
	return out
}

type Image struct {
	Item *docker.Image `json:"Item"`
}

func (c *Docker) InspectImage(in string) *Image {
	var out = &Image{}
	img, err := c.Client.InspectImage(in)
	var item = &docker.Image{}
	ReportErr(err)
	item.ID = img.ID
	item.Created = img.Created
	item.RepoTags = img.RepoTags
	item.Parent = img.Parent
	item.Container = img.Container
	item.Author = img.Author
	out.Item = item
	return out
}
