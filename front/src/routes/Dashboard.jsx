import { useGetStatisticsQuery } from "../redux/slices/materialsApiSlice";
import "../styles/dashboard.scss"
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () =>
{
    const { data, isLoading, isSuccess } = useGetStatisticsQuery();

    let totalMaterialsUsed;
    let countMaterialsUsedByProduct;
    if (!isLoading && isSuccess)
    {
        totalMaterialsUsed = {
            labels: data.byProductsTypes_totalMaterialsUsed.map(totMatUsed => totMatUsed.name),
            datasets: [
                {
                    label: 'par type de produits',
                    data: data.byProductsTypes_totalMaterialsUsed.map(totMatUsed => totMatUsed.count),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'pour chaque produits',
                    data: data.forEachProducts_totalMaterialsUsed.map(totMatUsed => totMatUsed.count),
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgb(255, 159, 64)',
                    borderWidth: 1,
                }
            ],
        };

        countMaterialsUsedByProduct = {
            labels: data.byProductsTypes_countMaterialsUsedByProduct.map(countMatProd => countMatProd.countProduct + " produit(s)"),
            datasets: [
                {
                    data: data.byProductsTypes_countMaterialsUsedByProduct.map(countMatProd => countMatProd.countMaterial),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }
            ],
        };
    }

    const options_totalMaterialsUsed = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'white', // Change la couleur des labels de la légende
                    font: {
                        size: 14, // Change la taille de la police des labels de la légende
                    }
                },
            },
            title: {
                display: true,
                text: 'Nombre de Matériaux utilisé',
                color: "white"
            },
            scales: {
                x: {
                    grid: {
                        color: 'blue', // Couleur de la grille pour l'axe x
                    },
                    ticks: {
                        color: 'white', // Couleur des ticks de l'axe x
                    },
                },
                y: {
                    grid: {
                        color: 'red', // Couleur de la grille pour l'axe y
                    },
                    ticks: {
                        color: 'white', // Couleur des ticks de l'axe y
                    },
                },
            }
        },
    };

    const options_countMaterialsUsedByProduct = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'white', // Change la couleur des labels de la légende
                    font: {
                        size: 14, // Change la taille de la police des labels de la légende
                    }
                },
            },
            title: {
                display: true,
                text: 'Nombre de Matériaux pour 1 produit',
                color: "white"
            },
            scales: {
                x: {
                    grid: {
                        color: 'blue', // Couleur de la grille pour l'axe x
                    },
                    ticks: {
                        color: 'white', // Couleur des ticks de l'axe x
                    },
                },
                y: {
                    grid: {
                        color: 'red', // Couleur de la grille pour l'axe y
                    },
                    ticks: {
                        color: 'white', // Couleur des ticks de l'axe y
                    },
                },
            }
        },
    };

    return (
        <>
            {!isLoading && isSuccess ?
                <div className="chart-container">
                    <Bar data={totalMaterialsUsed} options={options_totalMaterialsUsed} />
                    <Bar data={countMaterialsUsedByProduct} options={options_countMaterialsUsedByProduct} />
                </div>
                :
                <span>Chargement...</span>
            }

        </>
    );
}

export default Dashboard;