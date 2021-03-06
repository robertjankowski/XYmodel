# Simulation of XY model

***
Running on **Heroku** - https://xy-model.herokuapp.com/

***
XY model is lattice model of statistical mechanics. 

**The spin configuration**

<img src="https://latex.codecogs.com/svg.latex?s_i&space;=&space;\left(\cos\theta_i,&space;\sin\theta_i\right)&space;\hspace{1cm}&space;-\pi&space;<&space;\theta_i&space;<&space;\pi" title="s_i = \left(\cos\theta_i, \sin\theta_i\right) \hspace{1cm} -\pi < \theta_i < \pi" />

**The configuration energy**

<img src="https://latex.codecogs.com/svg.latex?H(s)&space;=&space;-&space;\sum_{<ij>}J_{ij}&space;s_i&space;\cdot&space;s_j&space;=&space;-\sum_{<ij>}&space;J_{ij}&space;\cos&space;(\theta_i&space;-&space;\theta_j)" title="H(s) = - \sum_{<ij>}J_{ij} s_i \cdot s_j = -\sum_{<ij>} J_{ij} \cos (\theta_i - \theta_j)" />

|  ![t01](model/plots/T_01.png) 	|   ![t08](model/plots/T_08.png)	|   ![t10](model/plots/T_10.png)	|
|---	|---	|---	|



|  ![hel](model/plots/cold_start/Helicity_cold_v2.png) 	|   ![energy](model/plots/cold_start/Energia_cold_v2.png)	|
|------	|-------	|
|   **Helicity modulus**	|   **Energy**	|
|   ![mag](model/plots/cold_start/Magn_cold_v2.png)	|   ![sus](model/plots/cold_start/Chi_cold_v2.png)	|
|   **Magnetization**	|   **Magnetic Susceptibility**	|