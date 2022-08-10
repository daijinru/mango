package com.mango.console.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PipelineController {
    @RequestMapping("/pipeline")
    public ModelAndView getPipeline(Model model) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("pipeline");
        return modelAndView;
    }
    @RequestMapping("/repos")
    public ModelAndView getRepos() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("repos");
        return modelAndView;
    }
}
