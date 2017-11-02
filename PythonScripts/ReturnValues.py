import arcpy,json,os,sys

arcpy.env.overwriteOutput = True

SdeConnection_Prod = r'\\gds0081s\MXD\Code4PA_Hackathon\HACKATHON17.sde'

inputPoint = arcpy.GetParameter(0)
#inputPopint = r'\\gds0081s\MXD\Code4PA_Hackathon\GeoDeciders_Analysis.gdb\TestPoint'

radonLocations = os.path.join(SdeConnection_Prod,'HACKATHON17.HACKATHON17.Points_1980s')

sr = arcpy.SpatialReference(2924)
srWM = arcpy.SpatialReference(3857)
#__________________________________________________________
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
#___________________________________________________________

arcpy.MakeFeatureLayer_management(radonLocations,"radonLocations_lyr")
arcpy.SelectLayerByLocation_management("radonLocations_lyr","WITHIN_A_DISTANCE",inputPoint,"20 Miles","NEW_SELECTION")
radonValuesMedian = []
radonValuesMax = []
radonValuesMin = []

with arcpy.da.SearchCursor("radonLocations_lyr",["MEDIAN","MAX_","MIN_"]) as valueCursor:
    for valueRow in valueCursor:
        if valueRow[0] != None:
            radonValuesMedian.append(valueRow[0])
            radonValuesMax.append(valueRow[1])
            radonValuesMin.append(valueRow[2])
#print radonValuesMedian
#print radonValuesMax
#print radonValuesMin
medianValue = median(radonValuesMedian)
maxValue = max(radonValuesMax)
minValue = min(radonValuesMin)
arcpy.SelectLayerByAttribute_management("radonLocations_lyr","CLEAR_SELECTION")
print medianValue
print maxValue
print minValue
#except:
    #print "There was a problem with the calculation"

resultMessageMedian = "The median estimated radon level in this area is {0}".format(medianValue)
resultMessageMAX = "The maximum estimated radon level in this area is {0}".format(maxValue)
resultMessageMIN= "The minimum estimated radon level in this area is {0}".format(minValue)
arcpy.AddMessage(resultMessageMedian)

arcpy.SetParameterAsText(1,resultMessageMedian)
arcpy.SetParameterAsText(2,resultMessageMAX)
arcpy.SetParameterAsText(3,resultMessageMIN)