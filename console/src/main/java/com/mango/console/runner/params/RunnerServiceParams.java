package com.mango.console.runner.params;

import java.util.ArrayList;
import java.util.List;

public class RunnerServiceParams extends RunnerBaseParams implements ParamsStrategy {
    public List returnParams() {
        return new ArrayList();
    }
}
