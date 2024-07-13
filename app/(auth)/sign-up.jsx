import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (form.email === "" || form.password === "" || form.username === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    setSubmitting(true);

    //try catch
    try {
      const result = await createUser(form.email, form.password, form.username);
      router.replace('/home')
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.daiLogo}
            resizeMode="contain"
            // className="w-[390px] h-[120px]"
            style={{ width: 390, height: 120, alignSelf: 'center' }}
          />

          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '600', color: 'white', marginTop: 10 }}>
            Sign Up to DoubleAI
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

            <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign in
            </Link>
          </View>

          </View>
      </ScrollView>
    </SafeAreaView>
  ) // end return
} // end SignIn

export default SignUp