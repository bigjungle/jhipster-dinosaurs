package com.rj.dinosaurs.cucumber.stepdefs;

import com.rj.dinosaurs.DinosaursApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = DinosaursApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
