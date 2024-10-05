import matplotlib.pyplot as plt

# Data for Warren Buffett's top 5 portfolio holdings
labels = ['Apple Inc. (AAPL)', 'Bank of America Corp. (BAC)', 'American Express Co. (AXP)', 
          'Coca-Cola Co. (KO)', 'Chevron Corp. (CVX)']
sizes = [30.09, 14.67, 12.54, 9.09, 6.63]

# Colors for the pie chart
colors = ['gold', 'lightcoral', 'lightskyblue', 'lightgreen', 'lightpink']

# Plotting the pie chart
fig, ax = plt.subplots()
ax.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', startangle=140)
ax.axis('equal')  # Equal aspect ratio ensures that the pie is drawn as a circle.

# Title for the pie chart
plt.title("Warren Buffett's Top 5 Portfolio Holdings")

# Display the chart
plt.show()