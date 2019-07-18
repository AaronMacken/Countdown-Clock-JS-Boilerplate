# Countdown-Clock-JS-Boilerplate
This repo can be used as starter code to implement some sort of countdown clock that your app may use. 
This code gets count down values from a list of radio buttons and initiates a count down based off of which value was selected.

The boilerplate also includes some boolean functions that prevent certain values from being selected based off of what the clock is doing.
This is to prevent the clock from behaving in an unusual way or breaking.

The code for the clock itself is running off of a set interval function which tics every second. This causes the clock to be slightly
inaccurate. Furthermore, if multiple commands are sent in rapid succession, the clock could potentially bug out. 

Improvements to the clocks base functionality will come in the future.
