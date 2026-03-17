import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

export function ResearchSection() {
  return (
    <Card className="shadow-md border-green-100">
      <CardHeader className="bg-green-50 border-b border-green-100">
        <CardTitle className="text-xl text-green-800 flex items-center">
          <BookOpen className="mr-2 h-5 w-5" />
          Research Focus
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="p-3 border border-green-100 rounded-md bg-green-50">
            <h4 className="font-medium text-green-800">Bridging Traditional & Modern</h4>
            <p className="text-sm text-gray-600 mt-1">
              Our research focuses on creating meaningful connections between traditional Korean medicine principles and
              modern scientific understanding, validating herbal remedies through both historical context and
              contemporary research.
            </p>
          </div>

          <div className="p-3 border border-green-100 rounded-md bg-green-50">
            <h4 className="font-medium text-green-800">AI-Assisted Herbal Recommendations</h4>
            <p className="text-sm text-gray-600 mt-1">
              We're developing machine learning models that can analyze symptom patterns and match them with appropriate
              herbal remedies based on traditional Korean medicine texts, modern research papers, and clinical
              observations.
            </p>
          </div>

          <div className="p-3 border border-green-100 rounded-md bg-green-50">
            <h4 className="font-medium text-green-800">Data Sources</h4>
            <p className="text-sm text-gray-600 mt-1">Our system integrates knowledge from:</p>
            <ul className="text-sm text-gray-600 mt-1 list-disc list-inside">
              <li>Classical Korean medicine texts (동의보감, Dongui Bogam)</li>
              <li>Contemporary herbal medicine research papers</li>
              <li>Clinical practice observations</li>
              <li>Pharmacological studies on herbal compounds</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
