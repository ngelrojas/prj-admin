import React from 'react';
import './App.css';
import Nav from "./components/Nav";
import Menu from "./components/Menu";

function App() {
  return (
    <div className="App">
      <Nav />

      <div className="container-fluid">
        <div className="row">
            <Menu />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

            <div className="table-responsive small">
              <table className="table table-striped table-sm">
                <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Header</th>
                  <th scope="col">Header</th>
                  <th scope="col">Header</th>
                  <th scope="col">Header</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>1,001</td>
                  <td>random</td>
                  <td>data</td>
                  <td>placeholder</td>
                  <td>text</td>
                </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
      <script src="/docs/5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>

      <script src="https://cdn.jsdelivr.net/npm/chart.js@4.3.2/dist/chart.umd.js" integrity="sha384-eI7PSr3L1XLISH8JdDII5YN/njoSsxfbrkCTnJrzXt+ENP5MOVBxD+l6sEG4zoLp" crossOrigin="anonymous"></script><script src="dashboard.js"></script>
    </div>
  );
}

export default App;
