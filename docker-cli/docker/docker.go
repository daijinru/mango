package docker

import (
	docker "github.com/fsouza/go-dockerclient"
	"log"
)

type Client struct {
	client *docker.Client `json:"client"`
}

func (c *Client) logFatal(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func (c *Client) NewClient() *Client {
	client, error := docker.NewClientFromEnv()
	c.logFatal(error)
	c.client = client
	return c
}

type Images struct {
	Size int                 `json:"Size"`
	List []*docker.APIImages `json:"List"`
	//ID          string            `json:"Id" yaml:"Id" toml:"Id"`
	//RepoTags    []string          `json:"RepoTags,omitempty" yaml:"RepoTags,omitempty" toml:"RepoTags,omitempty"`
	//Created     int64             `json:"Created,omitempty" yaml:"Created,omitempty" toml:"Created,omitempty"`
	//Size        int64             `json:"Size,omitempty" yaml:"Size,omitempty" toml:"Size,omitempty"`
	//VirtualSize int64             `json:"VirtualSize,omitempty" yaml:"VirtualSize,omitempty" toml:"VirtualSize,omitempty"`
	//ParentID    string            `json:"ParentId,omitempty" yaml:"ParentId,omitempty" toml:"ParentId,omitempty"`
	//RepoDigests []string          `json:"RepoDigests,omitempty" yaml:"RepoDigests,omitempty" toml:"RepoDigests,omitempty"`
	//Labels      map[string]string `json:"Labels,omitempty" yaml:"Labels,omitempty" toml:"Labels,omitempty"`
}

func (c *Client) ListImages() *Images {
	var out = &Images{}
	imgs, err := c.client.ListImages(docker.ListImagesOptions{All: false})
	c.logFatal(err)
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

func (c *Client) InspectImage(in string) *Image {
	var out = &Image{}
	img, err := c.client.InspectImage(in)
	var item = &docker.Image{}
	c.logFatal(err)
	item.ID = img.ID
	item.Created = img.Created
	item.RepoTags = img.RepoTags
	item.Parent = img.Parent
	item.Container = img.Container
	item.Author = img.Author
	out.Item = item
	return out
}
