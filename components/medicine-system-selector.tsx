"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useMedicineSystem } from "@/hooks/use-medicine-system"

export function MedicineSystemSelector() {
  const { system, setSystem } = useMedicineSystem()

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Choose Your Medicine System</h2>

      <Tabs
        defaultValue={system}
        className="w-full max-w-4xl mx-auto"
        onValueChange={(value) => setSystem(value as "korean" | "ayurvedic" | "integrated")}
      >
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="korean" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
            Korean Medicine
          </TabsTrigger>
          <TabsTrigger
            value="ayurvedic"
            className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800"
          >
            Ayurvedic Medicine
          </TabsTrigger>
          <TabsTrigger value="integrated" className="data-[state=active]:bg-teal-100 data-[state=active]:text-teal-800">
            Integrated Approach
          </TabsTrigger>
        </TabsList>

        <TabsContent value="korean" className="mt-0">
          <Card className="border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="/images/korean-medicine.jpg"
                    alt="Korean Medicine"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-green-800">Korean Traditional Medicine</h3>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">한의학</Badge>
                  </div>
                  <p className="text-gray-600">
                    Korean traditional medicine, also known as Hanbang (한방) or Korean Oriental Medicine, focuses on
                    restoring balance to the body's energy systems. It emphasizes the principles of Yin and Yang, the
                    Five Elements, and the concept of Ki (energy flow).
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-green-200 text-green-700">
                      Herbal Medicine
                    </Badge>
                    <Badge variant="outline" className="border-green-200 text-green-700">
                      Acupuncture
                    </Badge>
                    <Badge variant="outline" className="border-green-200 text-green-700">
                      Moxibustion
                    </Badge>
                    <Badge variant="outline" className="border-green-200 text-green-700">
                      Cupping
                    </Badge>
                    <Badge variant="outline" className="border-green-200 text-green-700">
                      Food Therapy
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ayurvedic" className="mt-0">
          <Card className="border-amber-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="/images/ayurvedic-medicine.jpg"
                    alt="Ayurvedic Medicine"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-amber-800">Ayurvedic Medicine</h3>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">आयुर्वेद</Badge>
                  </div>
                  <p className="text-gray-600">
                    Ayurveda, the "science of life," is one of the world's oldest holistic healing systems. It was
                    developed in India over 3,000 years ago and is based on the belief that health and wellness depend
                    on a delicate balance between the mind, body, and spirit.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-amber-200 text-amber-700">
                      Dosha Balance
                    </Badge>
                    <Badge variant="outline" className="border-amber-200 text-amber-700">
                      Herbal Remedies
                    </Badge>
                    <Badge variant="outline" className="border-amber-200 text-amber-700">
                      Panchakarma
                    </Badge>
                    <Badge variant="outline" className="border-amber-200 text-amber-700">
                      Yoga
                    </Badge>
                    <Badge variant="outline" className="border-amber-200 text-amber-700">
                      Meditation
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrated" className="mt-0">
          <Card className="border-teal-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center">
                  <div className="text-3xl">🌿</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-teal-800">Integrated Approach</h3>
                    <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200">Holistic</Badge>
                  </div>
                  <p className="text-gray-600">
                    Our integrated approach combines the wisdom of both Korean and Ayurvedic medicine systems, offering
                    a comprehensive perspective on health and wellness. This approach recognizes the complementary
                    nature of these ancient traditions and their shared emphasis on balance and harmony.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-teal-200 text-teal-700">
                      Cross-Cultural
                    </Badge>
                    <Badge variant="outline" className="border-teal-200 text-teal-700">
                      Comprehensive
                    </Badge>
                    <Badge variant="outline" className="border-teal-200 text-teal-700">
                      Personalized
                    </Badge>
                    <Badge variant="outline" className="border-teal-200 text-teal-700">
                      Evidence-Based
                    </Badge>
                    <Badge variant="outline" className="border-teal-200 text-teal-700">
                      Holistic Wellness
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
