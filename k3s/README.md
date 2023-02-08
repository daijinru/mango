## installing

```bash
$ curl -sfL https://rancher-mirror.rancher.cn/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn INSTALL_K3S_EXEC="server --docker" sh -
```

## kubenetes-dashboard

reference [kube-dashboard](https://docs.rancher.cn/docs/k3s/installation/kube-dashboard/_index)

If need access from other host then:
```bash
$ kubectl get svc -n kubernetes-dashboard
# find the port and set port-forward
$ kubectl port-forward -n kubernetes-dashboard --address 0.0.0.0 service/kubernetes-dashboard 8083:443
```