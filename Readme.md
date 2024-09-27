# Performance Monitoring System

## Overview

This project is a performance monitoring system designed to collect and display real-time performance data from multiple machines. It consists of two main components: a Node.js server and a React client.

## Features

- **Real-Time Data Collection**: Collects performance data such as CPU usage, memory usage, and system information in real-time.
- **Data Visualization**: Displays the collected data in a user-friendly manner using a React-based dashboard.
- **Machine Identification**: Uses MAC addresses to identify and track individual machines.
- **Scalability**: Designed to scale easily to handle a large number of machines.

## Technologies Used

- **Node.js**: Used for the server-side logic and data processing.
- **React**: Used for the client-side application and data visualization.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/performance-monitoring-system.git
   ```

2. Install dependencies:

    ```
    cd server
    npm install
    cd ../react-client
    npm install
    ```

3. Start the server:

    ```
    cd server
    npm run dev
    ```

4. Start the client:

    ```
    cd react-client
    npm run dev
    ```

## Usage

1. Open your browser and navigate to `http://localhost:8080`.
2. You should see a list of machines with their respective performance data.

## Contributing

