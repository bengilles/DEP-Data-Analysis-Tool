import arcpy


arcpy.env.workspace = r"C:\Users\jrogers\Documents\Code4PA\GeoDeciders.gdb"

outPath = r"C:\Users\jrogers\Documents\Code4PA\GeoDeciders.gdb"
radon = r"C:\Users\jrogers\Documents\Code4PA\GeoDeciders.gdb\Radon_2000s"
points = r"C:\Users\jrogers\Documents\Code4PA\GeoDeciders.gdb\Points_2000s"
inMemory = "in_memory"
uniqueIDs = []
arcpy.Delete_management("radon_lyr")
arcpy.Delete_management("points_lyr")

def median(thelist):
    sorted_list = sorted(thelist)
    length = len(sorted_list)
    center = length // 2

    if length == 1:
        return sorted_list[0]

    elif length % 2 == 0:
        return sum(sorted_list[center - 1: center + 1]) / 2.0

    else:
        return sorted_list[center]
    
arcpy.MakeTableView_management(radon,"radon_lyr")
arcpy.MakeFeatureLayer_management(points,"points_lyr")

with arcpy.da.SearchCursor("radon_lyr",["Measure_Value","Unique_id"]) as cursor:
    for row in cursor:
        if row[1] not in uniqueIDs:
            radonValues = []
            id = row[1]
            whereMuni = "Unique_id = " + "'" + id + "'"
            uniqueIDs.append(row[1])
            try:
                arcpy.SelectLayerByAttribute_management("radon_lyr","NEW_SELECTION",whereMuni)
                with arcpy.da.SearchCursor("radon_lyr",["Measure_Value"]) as valueCursor:
                    for valueRow in valueCursor:
                        radonValues.append(valueRow[0])
                medianOfPoly = median(radonValues)
                #print medianOfPoly
                maxOfPoly = max(radonValues)
                minOfPoly = min(radonValues)
                #print maxOfPoly
                #print minOfPoly
                arcpy.SelectLayerByAttribute_management("points_lyr","CLEAR_SELECTION")
                wherePoint = "Unique_ID = " + "'" + row[1] + "'"
                arcpy.SelectLayerByAttribute_management("points_lyr","NEW_SELECTION",wherePoint)
                with arcpy.da.UpdateCursor("points_lyr",["MEDIAN","MAX","MIN"]) as writeCursor:
                    for writeRow in writeCursor:
                        writeRow[0] = medianOfPoly
                        writeRow[1] = maxOfPoly
                        writeRow[2] = minOfPoly
                        writeCursor.updateRow(writeRow)
            except:
                print "There was a problem with {0} point".format(id)


            
                