# Assignment 1: Onboard vs. Offboard Data Analytics
 ## Task 1: Preliminaries
### a) Estimated average power consumption
We know that P = U * I

We have the following actions:
- Active BLE
- Accelerometer @ 12.5 Hz
- CPU @ 100% for 5 ms every 1.6 s


From the power consumption table on the website https://www.espruino.com/Puck.js#power-consumption, 
we get the following current values for the given actions:
- Active BLE: 600 µA
- Accelerometer @ 12.5 Hz: 350 µA
- CPU @ 100% for 5 ms every 1.6 s
  - CPU ussage cycle: 0.005 s / 1.6 s = 0.003125
  - Thus, the avverage CPU current is:  4000 µA * 0.003125 =  12.5 µA

600 µA + 350 µA + 12.5 µA  = 962.5 µA ≈ 0.963 mA

The CR2032 has a voltage  3 V.

P = U * I = 0.963 mA * 3.0 V ≈ 2.89 mW

The average power consumption is approximately 2.9 mW (with default BLE connection settings).

### b) Battery Life Estimate
We use the properties of a GP CR2032 battery:
- Voltage: 3.0 V
- Capacity: 220 mAh
- Each classification consumes 2.5 mW over 1.6 s

We calculate the total energy in the battery and the energy consumption per classification, 
we then get te number of possible classification per battery. We know that E = P * t and 1 Joule [J] = 1 Wattsekunde [Ws] = 1 VAs = 1 Nm.


**Battery energy**

Capacity = 220 mAh = 0.22 Ah  
Energy = 0.22 Ah * 3.0 V = 0.66 Wh  
Convert to Joules: 0.66 Wh * 3600 = 2376 J

**Energy per classification**

Power = 2.5 mW = 0.0025 W  
Time = 1.6 s  
Energy per classification = 0.0025 * 1.6 = 0.004 J

**Number of classifications**  
Number = 2376 J / 0.004 J ≈ 594,000

A CR2032 can support roughly 594,000 gesture classifications.



### c) Estimating Task Energy
We know that E = P * t and have an indication (digital signal), when the task is running.

You can estimate the task’s energy by multiplying power and time only during the intervals when the digital signal is high. We finally sum up those values across the task duration.


## Task 2: On-Board Data Analysis
### a) Flash Puck.js
I used the firmware provided in Slack.

### b) Program
See [task2_b.js](../src/task2_b.js)

### c)
See [task2_c.js](../src/task2_c.js)

## Tas 3: Off-Board Data Analysis

## Task 4: Analyze Power Traces
### a)
### b)
### c)

## Task 5: Compare and Contrast