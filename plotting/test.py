import matplotlib.pyplot as plt
import pandas as pd
plt.style.use('ggplot')

df = pd.read_csv("T_M-test.txt", sep="\t", header=None)
df.columns = ["T", "M"]
print(df.head())
plt.plot(df["T"], df["M"])
plt.xlabel("T")
plt.ylabel("M")
plt.show()