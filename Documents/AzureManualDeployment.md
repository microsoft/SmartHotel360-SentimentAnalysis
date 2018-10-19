If you prefer to manually create the Azure resources follow this walk though:

1. Create a Bing Maps API for Enterprise resource in the Azure Portal by clicking the **New** button, then searching for `Bing` and selecting the **Bing Maps API for Enterprise** option. 

    ![Search for Bing](Images/01-bing.png)

1. The free tier for public web sites should be appropriate for getting started. 

    ![Selecting the free tier of service](Images/02-bing.png)

1. Create a new Storage Account in the same resource group as the Bing Maps API resource. 

    ![Create a Storage Account](Images/02-storage.png)

1. Create a new Azure Container Registry resource by clicking the **New** button in the Azure Portal, then searching for `Registry.` Any tier of service would be appropriate. Create the resource in the same resource group as the Bing Maps API for Enterprise resource. 

    ![Creating the Azure Container Registry](Images/03-acr.png)

1. Once the Azure Container Registry instance has been created, enable the Admin user as shown in the screen shot below. 

    ![Enabling Admin user](Images/04-keys.png)

1. Create a new Basic Linux App Service Plan in the same region and resource group as the Azure Container Registry and Bing Maps API for Enterprise resources. 

    ![Enabling Admin user](Images/05-plan.png)

1. Create a Function App based on JavaScript language, you can select the Linux App Service Plan and the storage that you just created.

    ![Creating an Azure Function](Images/55-function-creation.png)

1. Create a Cognitive Services Text Analytics API resource using the Azure Portal. 

    ![Creating Text Analytics resource](Images/06-text.png)

1. Create a new Cosmos DB database, and select the SQL API. 

    ![Create a Cosmos DB with SQL API](Images/07-cosmos-sql.png)


1. Create a second Cosmos DB database, and select the Graph (Gremlin) API. 

    ![Create a Cosmos DB with Graph API](Images/07-cosmos-graph.png)


1. Create a new Logic App using the Azure Portal. 

    ![New Logic App](Images/09-logic-app.png)
