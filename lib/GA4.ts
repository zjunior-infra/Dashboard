// Establishing the connections with the google analytics data API
import BetaAnalyticsDataClient from "@google-analytics/data";

const options = {
    credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY?.split(String.raw`\n`).join('\n'),
    },
    email: process.env.CLIENT_EMAIL,
    projectId: process.env.PROJECT_ID
}
const analyticsDataClient = new BetaAnalyticsDataClient.BetaAnalyticsDataClient(options);
export default analyticsDataClient;